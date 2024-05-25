import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id'> 

class GetClub extends Operation<Input, Club> {
   protected async run(requestData: Input): Promise<Club> {
    const {id} = requestData
    const existingClub: Club | undefined = await clubRepository.findByIdWithCreator(id)
    console.log(existingClub)
    if (!existingClub) {
      throw new NotFoundError
    }

    return existingClub
   }
}

export const getClub = new GetClub()