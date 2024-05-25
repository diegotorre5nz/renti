import { NotFoundError } from "../../../utils/errors"
import { User } from "../../../database/models/user"
import { userRepository } from "../../../database/repositories/user"
import { Operation } from "../../operation"

export type Input = Pick<User, 'id'> 

class DeleteUser extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    const {id} = requestData
    const existingUser: User | undefined = await userRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundError
    }

    const deletedUser: User | undefined = await userRepository.deleteById(id)

   }
}

export const deleteUser = new DeleteUser()