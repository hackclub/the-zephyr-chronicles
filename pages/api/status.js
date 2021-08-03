import { getRawPosts } from "./posts";

export async function getStatus(){
  const posts = await getRawPosts();
  return {amount: posts.length, percent: (posts.length / 5).toFixed(2)};
}

export default async (req, res) => {
  const status = await getStatus();
  return res.json(status)
}
