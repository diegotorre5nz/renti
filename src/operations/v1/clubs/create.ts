import { ConflictError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<Club, 'name' | 'userId' >

export interface Output {
  club: Club
}

class CreateClub extends Operation<Input, Output> {
   protected async run(requestData: Input): Promise<Output> {
    const { userId, name } = requestData
    const existingClub: Club | undefined = await clubRepository.findByName(name)
  
    if (existingClub) {
      throw new ConflictError('User already exists.')
    }

    const clubData = {
      name,
      userId
    }
    
    const newClub: Club = await clubRepository.insert(clubData)

    return { 
      club: newClub,
    }
   }
}

export const createClub = new CreateClub()