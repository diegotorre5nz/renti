import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id' | 'name' >

class PatchClub extends Operation<Input, Club> {
   protected async run(requestData: Input): Promise<Club> {
    const {id, name, } = requestData
    
    const clubData = {
      name,
    }

    const updatedClub: Club | undefined = await clubRepository.patchById(id, clubData)

    if (!updatedClub) {
      throw new NotFoundError
    }

    return updatedClub
   }
}

export const patchClub = new PatchClub()