import { checkUser, setEddies } from '../../../lib/web/database'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

async function handler(req, res) {
  const { user } = await getSession(req, res);
  if (!await checkUser(user.email)) {
    res.status(500).json("[]")
    return
  }

  if (req.method === 'POST') {
    var body = JSON.parse(req.body)
    let data = null
    switch (body.method) {
    case "setEddies":
      data = await setEddies(body.playerId, body.eddies)
      res.status(200).json(data)
      break;
    }
  }
}

export default withApiAuthRequired(handler)
