import prisma from '../../../lib/prisma'

export const getRawUsers = async (onlyFull = false) =>
  await prisma.user.findMany({
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

export const transformUser = (user = {}) => ({
  id: user?.id,
  username: user?.fields['Username'] || null,
  avatar: user?.fields['Avatar']?.[0]?.thumbnails?.large?.url || null,
  webring: user?.fields['Webring'] || [],
  css: user?.fields['CSS URL'] || null,
  audio: user?.fields['Audio URL'] || null,
  streakCount: user?.fields['Streak Count'] || 0,
  updatesCount: user?.fields['Updates Count'] || 0,
  displayStreak: !user?.fields['Streaks Toggled Off'],
  slack: user?.fields['ID'] || '',
  github: user?.fields['GitHub'] || null,
  website: user?.fields['Website'] || null
})

export const getProfiles = () =>
  getRawUsers()//.then(users => users.map(transformUser))

export default async (req, res) => getProfiles().then(u => res.json(u || []))
