import { getCharacter } from '../../lib/web/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let data = await getCharacter(JSON.parse(req.body).email)
    res.status(200).json(data)
  }
}
