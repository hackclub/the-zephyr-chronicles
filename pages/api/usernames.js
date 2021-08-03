import { map } from 'lodash'
import { getRawUsers } from '../api/users'

export const getUsernames = () =>
  getRawUsers().then(r=>r.map(user => user.name))

export default async (req, res) => getUsernames().then((u) => res.json(u || []))
