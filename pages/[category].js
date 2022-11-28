import Head from 'next/head'
import { getProducts } from '../lib/web/apis'
import styles from '../styles/pages/Category.module.scss'

export default function Category({ products, category }) {

  return (
    <div>
      <Head>
        <title>{`${category} | Cyberpunk 2377 Nightmarket`}</title>
        <meta name="description" content={`Cyberpunk 2377 store to buy ${category}`} />
      </Head>
      <div style={{ backgroundImage: `url(/images/${category}.jpg)` }} className={styles.background}></div>
      <main className={styles.products}>
        { products.map((product) => (
          <div key={product.productid} className={styles.product}>
            <div className={styles.name}>
              <p>{product.name}</p>
            </div>
            <div className={styles.data}>
              { product.corp_name && (<p>Corp: {product.corp_name}</p>) }
              { product.short_desc && (<p>Info: {product.short_desc}</p>) }
              { product.requirements && (<p>Restrictions: {product.requirements}</p>) }
              { product.cost && (<p>Cost: {product.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}eb</p>) }
              { product.subscription_cost && (<p>Cost p/m: {product.subscription_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}eb</p>) }
              { product.w_skill && (<p>Weapon Skill: {product.w_skill}</p>) }
              { product.w_damage && (<p>Weapon Damage: {product.w_damage}</p>) }
              { product.w_magazine && (<p>Magazine: {product.w_magazine}</p>) }
              { product.w_rof && (<p>Rate of Fire: {product.w_rof}</p>) }
              { product.w_hands && (<p>Hands Required: {product.w_hands}</p>) }
              { product.w_concealed && (<p>Can be Concealed: {product.w_concealed}</p>) }
              { product.a_sp && (<p>SP: {product.a_sp}</p>) }
              { product.a_ceal && (<p>CEAL Slots: {product.a_ceal}</p>) }
              { product.c_install && (<p>Install Level: {product.c_install}</p>) }
              { product.c_humanity && (<p>Humanity Loss: {product.c_humanity}</p>) }
              { product.n_per && (<p>Program Perception: {product.n_per}</p>) }
              { product.n_spd && (<p>Program Speed: {product.n_spd}</p>) }
              { product.n_atk && (<p>Program Attack: {product.n_atk}</p>) }
              { product.n_def && (<p>Program Defence: {product.n_def}</p>) }
              { product.n_rez && (<p>Program Rez: {product.n_rez}</p>) }
              { product.v_sdp && (<p>SDP: {product.v_sdp}</p>) }
              { product.v_sp && (<p>SP: {product.v_sp}</p>) }
              { product.v_move && (<p>Move: {product.v_move}</p>) }
              { product.v_stats && (<p>Stats: {product.v_stats}</p>) }
              { product.description && (<p>Description: {product.description}</p>) }
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  let data = await getProducts(params.category)
  return {
    props: {
      products: data,
      category: params.category.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    }
  }
}
