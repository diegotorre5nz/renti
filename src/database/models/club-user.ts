import { type Pojo } from 'objection'
import { BaseModel } from './base'

export class ClubUser extends BaseModel {
  static tableName = 'clubs_users'

  clubId: number
  userId: number
  
  async $beforeInsert(): Promise<void> {
    super.$beforeInsert()
    
  }

  async $beforeUpdate(): Promise<void> {
    super.$beforeUpdate()

  }

  $formatDatabaseJson(json: Pojo): Pojo {
    json = super.$formatDatabaseJson(json)
    return json //TODO remove
    //TODO return lowercaseObjectProperty(json, 'email')
  }

}