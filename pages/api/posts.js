import { find, reverse, orderBy, compact, isEmpty } from 'lodash'
import { getRawUsers, transformUser } from './users'
import { stripColons } from '../../lib/emoji'
import prisma from '../../lib/prisma'
import { tryGetPreviewData } from 'next/dist/next-server/server/api-utils'

export const getRawPosts = async (max = 10000000000000, params = {}) => {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: max == null ? undefined : max,
    select: {
      id: true,
      userId: true,
      text: true,
      attachments: true,
      createdAt: true,
      withUsernames: true,
      usState: true,
      User: {
        select: {
          id: true,
          name: true,
          cssURL: true,
          audioURL: true,
          profilePicture: true
        }
      }
    },
    ...params
  }) 
}

export const formatTS = ts => (ts ? new Date(ts * 1000).toISOString() : null)

export const getPosts = async (max = 10000000000000) => {
  const users = await getRawUsers(true)
  return await getRawPosts(max)
}

export default async (req, res) => {
  const posts = await getPosts(req.query.max ? Number(req.query.max) : 200)
  return res.json(posts)
}
