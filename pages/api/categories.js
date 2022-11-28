import { getCategories } from '../../lib/web/database'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let data = await getCategories()
    res.status(200).json(data)
  }
}
