import type {
  ArrayQueryBuilder,
  MaybeSingleQueryBuilder,
  ModelClass,
  NumberQueryBuilder,
  QueryBuilderType,
  SingleQueryBuilder,
  Transaction,
} from 'objection'
import type { BaseModel } from '../models/base'

export interface PaginationOptions {
  page: number
  pageSize: number
}

export interface OrderOptions {
  column: string
  direcction: 'asc' | 'desc'
}

export class BaseRepository<T extends BaseModel>{
  model: ModelClass<T>
  protected transaction?: Transaction

  constructor(model: ModelClass<T>, transaction?: Transaction) {
    this.model = model
    this.transaction = transaction
  }

  query(): QueryBuilderType<T> {
    return this.model.query(this.transaction)
  }

  insert(data: object): SingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().insertAndFetch(data)
  }

  findAll(): ArrayQueryBuilder<QueryBuilderType<T>> {
    return this.query().where({ deleteAt: null})
  }

  findOneBy(query: object): MaybeSingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().findOne({ ...query, deletedAt: null})
  }

  findById(id: number): MaybeSingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().where({ deletedAt: null }).findById(id)
  }

  patchById(id: number, data: object): SingleQueryBuilder<QueryBuilderType<T>> {
    return this.query().updateAndFetchById(id, data)
  }

  deleteById(id: number): SingleQueryBuilder<QueryBuilderType<T>> {
    return this.patchById(id,{ deletedAt: new Date() })
  }

  patchByIdAndUser(id: number, userId: number, data: object): MaybeSingleQueryBuilder<NumberQueryBuilder<QueryBuilderType<T>>> {
    return this.query().patch(data).where('user_id','=',userId).findById(id)
  }

  deleteByIdAndUser(id: number, userId: number): MaybeSingleQueryBuilder<NumberQueryBuilder<QueryBuilderType<T>>> {
    return this.query().patch({ deletedAt: new Date() }).where('user_id','=',userId).findById(id)
  }

}
