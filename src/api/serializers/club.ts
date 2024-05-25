import moment from 'moment'
import { User } from '../../database/models/user'
import { SerializedUser } from './user'
import { Club } from '../../database/models/club'

export interface ClubWithUser {
  id: number,
  ceatorName: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
 }

 export const serializedClub = (clubInput: Club): ClubWithUser => ({
  id: clubInput.id,
  ceatorName: clubInput.name,
  createdAt: clubInput.createdAt,
  updatedAt: clubInput.updatedAt,
  deletedAt: clubInput.deletedAt,
 })

 export const clubWithCreator = (clubInput: Club): ClubWithUser => ({
  id: clubInput.id,
  ceatorName: clubInput.name,
  createdAt: clubInput.createdAt,
  updatedAt: clubInput.updatedAt,
  deletedAt: clubInput.deletedAt,
 })

 export const clubWithCreatorArray = (clubInput: Club[]): ClubWithUser[] => {
  return clubInput.map(function(item) {
    return clubWithCreator(item)
  })
 }
