import {
  MaybeSingleQueryBuilder,
  Page,
  QueryBuilder,
  QueryBuilderType,
  Transaction,
  raw,
} from 'objection'
import { Thread } from '../models/thread'
import type { OrderOptions, PaginationOptions } from './base'
import { BaseRepository } from './base'
import { threadId } from 'worker_threads'

export interface ClubOrderOptions extends OrderOptions {
  column: 'id' | 'createdAt' | string 
}

export interface FilterOptions {
  order: ClubOrderOptions
  pagination: PaginationOptions
} 

export interface PaginatedusersList {
  total: number
  results: Thread[]
}

export class ThreadRepository extends BaseRepository<Thread> {
  constructor(transaction?: Transaction) {
    super(Thread, transaction)
  }

  findByName (name: string): MaybeSingleQueryBuilder<QueryBuilderType<Thread>> {
    return this.findOneBy({ name })
  }

  findforAdmin(options: FilterOptions) : QueryBuilder<Thread, Page<Thread>> {
    const { order, pagination } = options

    return this.findAll()
      .skipUndefined()
      .orderBy(order.column, order.direcction)
      .page(pagination.page, pagination.pageSize)
  }

  async findMainByIdAndCreator(id: number, creatorId: number): Promise<QueryBuilder<Thread, Thread | undefined>>  {
    const result = await Thread.query().select(raw('threads.*')).findById(id)
    .whereRaw('threads.deleted_at IS NULL AND threads.user_id = ?', creatorId)
    return result
  }

  async findAllMainByClubId(clubId: number): Promise<QueryBuilder<Thread, Thread[] | undefined>>  {
    const result = await Thread.query().select(raw('threads.*, creator.name as "creatorName"'))
    .joinRaw('LEFT JOIN users as creator ON threads.user_id = creator.id')
    .whereRaw('threads.deleted_at IS NULL AND threads.main_thread_id IS NULL AND threads.club_id = ?', clubId)
    .orderBy(raw('threads.created_at'))
    return result
  }

  async findAllByMainThreadId(clubId: number, mainThreadId: number): Promise<QueryBuilder<Thread, Thread[] | undefined>>  {
    const result = await Thread.query().select(raw('threads.*, creator.name as "creatorName", previous_thread.text as "previousThreadText", previous_thread_user.name as "previousCreatorName"'))
    .joinRaw('LEFT JOIN users as creator ON threads.user_id = creator.id')
    .joinRaw('LEFT JOIN threads as previous_thread ON threads.previous_thread_id = previous_thread.id')
    .joinRaw('LEFT JOIN users as previous_thread_user ON previous_thread.user_id = previous_thread_user.id')
    .whereRaw('threads.deleted_at IS NULL AND threads.main_thread_id = ?', mainThreadId )
    .whereRaw('threads.club_id = ?', clubId )
    .orderBy(raw('threads.created_at'))
    console.log(mainThreadId)
    return result
  }

}

export const threadRepository = new ThreadRepository()
