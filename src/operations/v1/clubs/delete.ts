import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id' | 'userId'> 

class DeleteClub extends Operation<Input, Club> {
   protected async run(requestData: Input): Promise<Club> {
    const {id, userId} = requestData

    const existingClub: Club | undefined = await clubRepository.findByIdWithCreator(id, userId)

    if (!existingClub) {
      throw new NotFoundError
    }

    await clubRepository.deleteByIdAndUser(id, userId)
    
    const deletedClub: Club | undefined = await clubRepository.findDeletedByIdWithCreator(id, userId)

    if (!deletedClub) {
      throw new NotFoundError
    }

    return deletedClub
   }
}

export const deleteClub = new DeleteClub()