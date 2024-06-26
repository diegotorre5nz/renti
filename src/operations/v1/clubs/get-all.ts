import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id'> 

class GetAll extends Operation<Input, Club[]> {
   protected async run(): Promise<Club[]> {
    const clubs: Club[] | undefined = await clubRepository.findAllWithCreator()
    if (!clubs) {
      throw new NotFoundError
    }
    return clubs
   }
}

export const getAll = new GetAll()