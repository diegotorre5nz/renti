import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id' | 'name' | 'userId'>

class PatchClub extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    const {id, name, userId } = requestData
    
    const clubData = {
      name,
    }

    await clubRepository.patchByIdAndUser(id, userId, clubData)

   }
}

export const patchClub = new PatchClub()
