import { join } from 'path'
import type { Pojo, RelationMappings } from 'objection'
import { Model } from 'objection'
import { BaseModel } from './base'
import { hashString } from '../../utils/crypto'

export class User extends BaseModel {
  static tableName = 'users'

  email: string
  name: string
  password: string
  dateOfBirth: Date
  readingPreferences: string

  protected $transformJSON = {
    omit: ['password', 'deletedAt'],
  }


  static relationMappings: RelationMappings = {
    
      refreshToken: {
        relation: Model.HasManyRelation,
        modelClass: join(__dirname, 'refresh_tokens'),
        join: {
          from: 'users.id',
          to: 'refresh_tokens.userId',
        },
      },

      club: {
        relation: Model.HasOneThroughRelation,
        modelClass: join(__dirname, 'club'),
        join: {
          from: 'user.id',
          through: {
            // clubs_users is the join table.
            from: 'clubs_users.userId',
            to: 'clubs_users.clubId'
          },
          to: 'club.id'
        }
      }
  }

  async $beforeInsert(): Promise<void> {
    super.$beforeInsert()

    if (this.password) {
      this.password = await hashString(this.password)
    }
  }

  async $beforeUpdate(): Promise<void> {
    super.$beforeUpdate()

    if(this.password) {
      this.password = await hashString(this.password) // eslint-disable-line require-atomic-updates
    }
  }

  $formatDatabaseJson(json: Pojo): Pojo {
    json = super.$formatDatabaseJson(json)
    return json //TODO remove
    //TODO return lowercaseObjectProperty(json, 'email')
  }

}
