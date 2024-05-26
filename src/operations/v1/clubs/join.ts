import { ConflictError, NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { ClubUser } from "../../../database/models/club-user"
import { clubUserRepository } from "../../../database/repositories/club-user"
import { clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<ClubUser, 'clubId' | 'userId' >

class JoinClub extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    const { clubId, userId } = requestData
    
    const existingClub: Club | undefined = await clubRepository.findByIdWithCreator(clubId, userId)
    
    if (!existingClub) {
      throw new NotFoundError
    }

    const clubData = {
      clubId,
      userId
    }

    const existingClubUser: ClubUser | undefined = await clubUserRepository.findOneBy(clubData)
    
    if (existingClubUser) {
      throw new ConflictError('User is already a member of this club.')
    }

    await clubUserRepository.insert(clubData)

   }
}

export const joinClub = new JoinClub()