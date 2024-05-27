import { NotFoundError } from "../../../utils/errors"
import { Thread } from "../../../database/models/thread"
import { threadRepository } from "../../../database/repositories/thread"
import { Operation } from "../../operation"

export type Input = Pick<Thread, 'id' | 'userId'> 

class DeleteThread extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    const {id, userId} = requestData

    const existingThread: Thread | undefined = await threadRepository.findMainByIdAndCreator(id, userId)

    if (!existingThread) {
      throw new NotFoundError
    }

    await threadRepository.deleteByIdAndUser(id, userId)
    
   }
}

export const deleteThread = new DeleteThread()