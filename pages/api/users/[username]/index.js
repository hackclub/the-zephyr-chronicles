import { map, find, isEmpty, orderBy } from 'lodash'
import { getRawUsers, transformUser } from '../index'
import { getRawPosts, transformPost } from '../../posts'
import prisma from '../../../../lib/prisma'

export const getProfile = async (value, field) => {
  let user = (
    await prisma.user.findMany({
      where: {
        name: value
      },
      select: {
        id: true,
        name: true,
        cssURL: true,
        audioURL: true,
        profilePicture: true,
        Posts: {
          select: {
            id: true
          }
        }
      }
    })
  )[0]
  console.log(user)
  if (!user) console.error('Could not fetch account', value)
  return user
}

export const getPosts = async user => {
  console.log(user)
  const allUpdates = await getRawPosts(null, {
    where: {
      OR: [
        {
          userId: user.id
        },
        { withUsernames: { contains: user.name } }
      ]
    }
  })

  if (!allUpdates) console.error('Could not fetch posts')
  return allUpdates
}

export default async (req, res) => {
  const profile = await getProfile(req.query.username)
  if (!profile?.id)
    return res.status(404).json({ status: 404, error: 'Cannot locate user' })
  let webring = []
  if (profile.webring) {
    webring = await Promise.all(
      profile.webring.map(async id => await getProfile(id, 'id'))
    )
  }
  const posts = (await getPosts(profile)) || []
  res.json({ profile, webring, posts })
}
