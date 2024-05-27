import { join } from 'path'
import type { Pojo, RelationMappings } from 'objection'
import { Model } from 'objection'
import { BaseModel } from './base'

export class Thread extends BaseModel {
  static tableName = 'threads'

  text: string
  clubId: number
  userId: number
  creatorName: string | undefined 
  mainThreadId: number
  mainText: string | undefined
  previousThreadId: number | undefined
  previousText: string | undefined
  previousCreatorName: string | undefined

  protected $transformJSON = {
    omit: ['deletedAt'],
  }

  static relationMappings: RelationMappings = { 
    creator: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, 'user'),
      join: {
        from: 'threads.userId',
        to: 'users.id',
      },
    },

    club: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, 'club'),
      join: {
        from: 'threads.clubId',
        to: 'clubs.id',
      },
    },

    origin: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, 'thread'),
      join: {
        from: 'threads.previousThreadId',
        to: 'thread.id'
      }
    },

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
