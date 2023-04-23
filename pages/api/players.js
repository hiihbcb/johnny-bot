import { getPlayer } from '../../lib/web/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let data = await getPlayer(JSON.parse(req.body).email)
    res.status(200).json(data)
  }
}
