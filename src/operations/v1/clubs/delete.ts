import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id'> 

class DeleteClub extends Operation<Input, Club> {
   protected async run(requestData: Input): Promise<Club> {
    const {id} = requestData
  
    const deletedClub: Club | undefined = await clubRepository.deleteById(id)
    
    if (!deletedClub) {
      throw new NotFoundError
    }

    return deletedClub
   }
}

export const deleteClub = new DeleteClub()