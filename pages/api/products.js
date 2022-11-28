import { getProducts } from '../../lib/web/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let data = await getProducts(JSON.parse(req.body).type)
    res.status(200).json(data)
  }
}
