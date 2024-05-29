import {
  MaybeSingleQueryBuilder,
  NumberQueryBuilder,
  Page,
  QueryBuilder,
  QueryBuilderType,
  Transaction,
  raw,
} from 'objection'
import { Club } from '../models/club'
import type { OrderOptions, PaginationOptions } from './base'
import { BaseRepository } from './base'

export interface ClubOrderOptions extends OrderOptions {
  column: 'id' | 'createdAt' | 'name' | string 
}

export interface FilterOptions {
  order: ClubOrderOptions
  pagination: PaginationOptions
} 

export interface PaginatedusersList {
  total: number
  results: Club[]
}

export class ClubRepository extends BaseRepository<Club> {
  constructor(transaction?: Transaction) {
    super(Club, transaction)
  }

  findByName (name: string): MaybeSingleQueryBuilder<QueryBuilderType<Club>> {
    return this.findOneBy({ name })
  }

  findforAdmin(options: FilterOptions) : QueryBuilder<Club, Page<Club>> {
    const { order, pagination } = options

    return this.findAll()
      .skipUndefined()
      .orderBy(order.column, order.direcction)
      .page(pagination.page, pagination.pageSize)
  }

  async findByIdWithCreator(id: number, creatorId: number): Promise<QueryBuilder<Club, Club | undefined>>  {
    const result = await Club.query().select(raw('clubs.*, creator.name as "creatorName"')).findById(id)
    .whereRaw('clubs.deleted_at IS NULL AND clubs.user_id = ?', creatorId)
    .joinRaw('LEFT JOIN users as creator ON clubs.user_id = creator.id')
    return result
  }

  async findAllWithCreator(): Promise<QueryBuilder<Club, Club[] | undefined>>  {
    const result: Club[] = await this.query().select(raw('clubs.*, creator.name as "creatorName", CASE WHEN jointClub.club_id IS NOT NULL THEN 1 ELSE 0 END as "isJoint"'))
    .whereRaw('clubs.deleted_at IS NULL')
    .joinRaw('LEFT JOIN users as creator ON clubs.user_id = creator.id')
    .joinRaw('LEFT JOIN clubs_users as jointClub ON clubs.user_id = jointClub.user_id')
    return result
  }

  async findJointWithCreator(): Promise<QueryBuilder<Club, Club[] | undefined>>  {
    const result: Club[] = await this.query().select(raw('clubs.*, creator.name as "creatorName"'))
    .whereRaw('clubs.deleted_at IS NULL AND jointClub.club_id IS NOT NULL')
    .joinRaw('LEFT JOIN users as creator ON clubs.user_id = creator.id')
    .joinRaw('LEFT JOIN clubs_users as jointClub ON clubs.user_id = jointClub.user_id')
    return result
  }
}

export const clubRepository = new ClubRepository()
