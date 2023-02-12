import Head from 'next/head'
import styles from '../styles/pages/Admin.module.scss'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getPlayer } from '../lib/web/apis'
import { Product } from '../lib/components'

export default function Admin() {

  return (
    <div>
      <Head>
        <title>Admin | Cyberpunk 2377 Nightmarket</title>
        <meta name="description" content="Cyberpunk 2377 admin page" />
      </Head>

      <main className={styles.admin}>
        <div>
          <Product/>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const player = await getPlayer(session.user.email)

    if (player[0].admin) {
      return { props: {}};
    }

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {}
    }
  }
});
