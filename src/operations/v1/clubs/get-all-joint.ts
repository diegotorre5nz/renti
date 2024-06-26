import { NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'id'> 

class GetAllJoint extends Operation<Input, Club[]> {
   protected async run(requestData: Input): Promise<Club[]> {
    const { id } = requestData
    const existingClub: Club[] | undefined = await clubRepository.findJointWithCreator(id)
    if (!existingClub) {
      throw new NotFoundError
    }

    return existingClub
   }
}

export const getAllJoint = new GetAllJoint()