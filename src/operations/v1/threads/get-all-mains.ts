import { ConflictError, NotFoundError } from "../../../utils/errors"
import { Thread } from "../../../database/models/thread"
import { threadRepository } from "../../../database/repositories/thread"
import { ClubUser } from "../../../database/models/club-user"
import { clubUserRepository } from "../../../database/repositories/club-user"
import { Operation } from "../../operation"

export type Input = Pick<Thread, 'clubId'| 'userId'> 

class GetAllMains extends Operation<Input, Thread[]> {
   protected async run(requestData: Input): Promise<Thread[]> {
    const {clubId, userId} = requestData

    const clubData = {
      clubId,
      userId
    }

    const existingClubUser: ClubUser | undefined = await clubUserRepository.findOneBy(clubData)

    if (!existingClubUser) {
      throw new ConflictError('User is not memeber of this club.')
    }
    const mainThreads: Thread[] | undefined = await threadRepository.findAllMainByClubId(clubId)
    
    if (!mainThreads) {
      throw new NotFoundError
    }

    return mainThreads
   }
}

export const getAllMains = new GetAllMains()