import { NotFoundError } from "../../../utils/errors"
import { User } from "../../../database/models/user"
import { userRepository } from "../../../database/repositories/user"
import { Operation } from "../../operation"

export type Input = Pick<User, 'id'> 

class GetUser extends Operation<Input, User> {
   protected async run(requestData: Input): Promise<User> {
    const {id} = requestData
    const existingUser: User | undefined = await userRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundError
    }
    return existingUser
   }
}

export const getUser = new GetUser()