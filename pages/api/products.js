import { getProducts, setProduct } from '../../lib/web/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    var body = JSON.parse(req.body)
    let data = null
    switch (body.method) {
    case "getProduct":
      data = await getProducts(body.type)
      res.status(200).json(data)
      break;
    case "setProduct":
      data = await setProduct(body.product)
      res.status(200).json(data)
      break;
    }
  }
}
