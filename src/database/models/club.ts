import { join } from 'path'
import type { Pojo, RelationMappings } from 'objection'
import { Model } from 'objection'
import { BaseModel } from './base'
import { User } from './user'

export class Club extends BaseModel {
  static tableName = 'clubs'

  name: string
  userId: number
  creatorName: string | undefined

  protected $transformJSON = {
    omit: ['deletedAt'],
  }

  static relationMappings: RelationMappings = { 
    creator: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, 'user'),
      join: {
        from: 'clubs.userId',
        to: 'users.id',
      },
    },

    user: {
      relation: Model.HasOneThroughRelation,
      modelClass: join(__dirname, 'user'),
      join: {
        from: 'club.id',
        through: {
          // clubs_users is the join table.
          from: 'clubs_users.clubId',
          to: 'clubs_users.userId'
        },
        to: 'user.id'
      }
    }
  }

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
