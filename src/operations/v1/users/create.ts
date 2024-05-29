import { ConflictError } from "../../../utils/errors"
import { User } from "../../../database/models/user"
import { userRepository } from "../../../database/repositories/user"
import { Operation } from "../../operation"
import { AccessToken, newAccessToken } from "../../../services/internal/access-tokens"
import { RefreshToken, newRefreshToken } from "../../../services/internal/refresh-tokens"
import { refreshTokenRepository } from "../../../database/repositories/refresh-token"

export type Input = Pick<User, 'name' | 'email' | 'password' | 'dateOfBirth' | 'readingPreferences'> & Pick<RefreshToken, 'ipAddress'>

export interface Output {
  user: User
}

class CreateUser extends Operation<Input, Output> {
   protected async run(requestData: Input): Promise<Output> {
    const {name, email, password, dateOfBirth, readingPreferences, ipAddress} = requestData
    const existingUser: User | undefined = await userRepository.findByEmail(email)
    
    if (existingUser) {
      throw new ConflictError('User already exists.')
    }

    const userData = {
      name,
      email,
      password,
      dateOfBirth,
      readingPreferences,
    }
    
    const newUser: User = await userRepository.insert(userData)

    return { 
      user: newUser,
    }
    
   }
}

export const createUser = new CreateUser()