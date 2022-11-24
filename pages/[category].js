import { getProducts } from '../lib/web/apis'
import styles from '../styles/pages/Category.module.scss'
import { useRouter } from 'next/router'

export default function Category({ products }) {
  const router = useRouter()
  const { category } = router.query

  return (
    <main style={{ backgroundImage: `url(/images/${category}.jpg)` }} className={styles.background}>
      { products.map((product) => (
        <div key={product.productid} className={styles.product}>
          <p>{product.name}</p>
        </div>
      ))}
    </main>
  )
}

export async function getServerSideProps({ req, res }) {
  let data = await getProducts()
  return {
    props: { products: data},
  }
}
