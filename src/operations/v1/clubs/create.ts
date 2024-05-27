import { ConflictError, NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { clubRepository } from "../../../database/repositories/club"
import { clubUserRepository } from "../../../database/repositories/club-user"
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

    const joinClubData = {
      clubId: newClub.id,
      userId
    }

    await clubUserRepository.insert(joinClubData)

    const newJoinedClub: Club | undefined = await clubRepository.findByIdWithCreator(joinClubData.clubId, joinClubData.userId)
    
    if (!newJoinedClub) {
      throw new NotFoundError
    }

    return {
      club: newJoinedClub
    }

   }
}

export const createClub = new CreateClub()