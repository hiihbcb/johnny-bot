import { getCharacter, setEddies } from '../../lib/web/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    var body = JSON.parse(req.body)
    let data = null
    switch (body.method) {
    case "getCharacter":
      data = await getCharacter(body.email)
      res.status(200).json(data)
      break;
    case "setEddies":
      data = await setEddies(body.playerId, body.eddies)
      res.status(200).json(data)
      break;
    }
  }
}
