import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id' | 'name' | 'userId'>

class PatchClub extends Operation<Input, Club> {
   protected async run(requestData: Input): Promise<Club> {
    const {id, name, userId } = requestData
    
    const clubData = {
      name,
    }

    await clubRepository.patchByIdAndUser(id, userId, clubData)

    const updatedClub: Club | undefined = await clubRepository.findByIdWithCreator(id, userId)

    if (!updatedClub) {
      throw new NotFoundError
    }

    return updatedClub
   }
}

export const patchClub = new PatchClub()
