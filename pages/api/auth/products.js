import { checkAdmin, setProduct } from '../../../lib/web/database'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

async function handler(req, res) {
  const { user } = await getSession(req, res);
  if (!await checkAdmin(user.email)) {
    res.status(500).json("[]")
    return
  }

  if (req.method === 'POST') {
    var body = JSON.parse(req.body)
    let data = null
    switch (body.method) {
    case "setProduct":
      data = await setProduct(body.product)
      res.status(200).json(data)
      break;
    }
  }
}

export default withApiAuthRequired(handler)
