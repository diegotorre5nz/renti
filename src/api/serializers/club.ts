import moment from 'moment'
import { User } from '../../database/models/user'
import { SerializedUser } from './user'
import { Club } from '../../database/models/club'

export interface ClubWithUser {
  id: number,
  name: string,
  creatorName: string | undefined,
  isJoint: boolean | undefined,
  createdAt: Date,
  updatedAt: Date,
 }

 export const clubWithCreator = (clubInput: Club): ClubWithUser => ({
  id: clubInput.id,
  name: clubInput.name,
  creatorName: clubInput.creatorName,
  isJoint: clubInput.isJoint,
  createdAt: clubInput.createdAt,
  updatedAt: clubInput.updatedAt,
 })

 export const clubWithCreatorArray = (clubInput: Club[]): ClubWithUser[] => {
  return clubInput.map(function(item) {
    return clubWithCreator(item)
  })
 }
