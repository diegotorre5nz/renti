import { ConflictError, NotFoundError } from "../../../utils/errors"
import { Club } from "../../../database/models/club"
import { ClubUser } from "../../../database/models/club-user"
import { clubUserRepository } from "../../../database/repositories/club-user"
import { ClubRepository, clubRepository } from "../../../database/repositories/club"
import { Operation } from "../../operation"

export type Input = Pick<ClubUser, 'clubId' | 'userId' >

class UnjoinClub extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    
    const existingClubUser: ClubUser | undefined = await clubUserRepository.findOneBy(requestData)
    
    if (!existingClubUser) {
      throw new NotFoundError
    }

    await clubUserRepository.deleteById(existingClubUser.id)

   }
}

export const unjoinClub = new UnjoinClub()