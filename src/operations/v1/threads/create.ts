import { ConflictError } from "../../../utils/errors"
import { Thread } from "../../../database/models/thread"
import { ClubUser } from "../../../database/models/club-user"
import { clubUserRepository } from "../../../database/repositories/club-user"
import { threadRepository } from "../../../database/repositories/thread"
import { Operation } from "../../operation"

export type Input = Pick<Thread, 'text' | 'clubId' | 'userId' | 'mainThreadId' | 'previousThreadId' >

export interface Output {
  thread: Thread
}

class CreateThread extends Operation<Input, Output> {
   protected async run(requestData: Input): Promise<Output> {

    const { text, clubId, userId, mainThreadId, previousThreadId  } = requestData

    const clubData = {
      clubId,
      userId
    }

    const existingClubUser: ClubUser | undefined = await clubUserRepository.findOneBy(clubData)

    if (!existingClubUser) {
      throw new ConflictError('User is not memeber of this club.')
    }

    const existingThread: Thread | undefined = await threadRepository.findOneBy({ text, clubId })
  
    if (existingThread) {
      throw new ConflictError('Thead already exists in this club.')
    }

    const threadData = {
      text, 
      clubId, 
      userId, 
      mainThreadId,
      previousThreadId,
    }

    console.log(threadData)

    const newThread: Thread = await threadRepository.insert(threadData)

    return { 
      thread: newThread,
    }
   }
}

export const createThread = new CreateThread()