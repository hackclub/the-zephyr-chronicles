import prisma from '../../lib/prisma'

export default async (req, res) => {
  console.log(req.body)
  try {
    const newPost = await prisma.posts.create({
      data: {
        ...JSON.parse(req.body)
      }
    })
    res.json(newPost)
  } catch (e) {
    console.log(e)
    res.json({ error: e })
  }
}
