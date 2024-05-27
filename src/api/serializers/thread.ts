import { Thread } from '../../database/models/thread'

export interface ThreadWithUserAndPrevious {
  id: number,
  text: string,
  creatorName: string | undefined,
  mainThreadId: number | undefined,
  previousThreadId: number | undefined,
  previousThreadText: string | undefined,
  previousCreatorName: string | undefined,
  createdAt: Date,
  updatedAt: Date,
 }

 export const serializedThreadWithUserAndPrevious = (threadInput: Thread): ThreadWithUserAndPrevious => ({
  id: threadInput.id,
  text: threadInput.text,
  creatorName: threadInput.creatorName,
  mainThreadId: threadInput.mainThreadId,
  previousThreadId: threadInput.previousThreadId,
  previousThreadText: threadInput.previousText,
  previousCreatorName: threadInput.previousCreatorName,
  createdAt: threadInput.createdAt,
  updatedAt: threadInput.updatedAt,
 })

 export const serializedThreadArray = (threadInput: Thread[]): ThreadWithUserAndPrevious[] => {
  return threadInput.map(function(item) {
    return serializedThreadWithUserAndPrevious(item)
  })
 }