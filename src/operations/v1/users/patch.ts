import { NotFoundError } from "../../../utils/errors"
import { User } from "../../../database/models/user"
import { userRepository } from "../../../database/repositories/user"
import { Operation } from "../../operation"

export type Input = Pick<User, 'id' | 'name' | 'email' | 'password' | 'dateOfBirth' | 'readingPreferences'>

class PatchUser extends Operation<Input, void> {
   protected async run(requestData: Input): Promise<void> {
    const {id, name, email, password, dateOfBirth, readingPreferences} = requestData
    const existingUser: User | undefined = await userRepository.findById(id)
    
    if (!existingUser) {
      throw new NotFoundError('User does not exists.')
    }

    const userData = {
      name,
      email,
      password,
      dateOfBirth,
      readingPreferences,
    }
    
    await userRepository.patchById(id, userData)

   }
}

export const patchUser = new PatchUser()