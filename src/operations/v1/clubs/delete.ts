import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id' | 'userId'> 

class DeleteClub extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    const {id, userId} = requestData

    const existingClub: Club | undefined = await clubRepository.findByIdWithCreator(id, userId)

    if (!existingClub) {
      throw new NotFoundError
    }

    await clubRepository.deleteByIdAndUser(id, userId)
    
   }
}

export const deleteClub = new DeleteClub()