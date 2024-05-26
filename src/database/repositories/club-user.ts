import {
  Transaction,
} from 'objection'
import { ClubUser } from '../models/club-user'
import { BaseRepository } from './base'

export class ClubUserRepository extends BaseRepository<ClubUser> {
  constructor(transaction?: Transaction) {
    super(ClubUser, transaction)
  }

}

export const clubUserRepository = new ClubUserRepository()
