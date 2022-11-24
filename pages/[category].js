import { getCategories, getProducts } from '../lib/web/database'
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

export async function getStaticPaths() {
  let data = await getCategories()

  return {
    paths: data.map( item => {
      return {
        params: {category: item.name}
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  let data = await getProducts()
  return {
    props: { products: data},
  }
}
