import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/pages/account/Index.module.scss'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getCharacter } from '../../lib/web/apis'

export default function Account({ user, character }) {

  if (!character[0]) {
    return (
      <main className={styles.account}>
        <div className={styles.title}>
          <p>NO CHARACTER FOUND</p>
        </div>
          <Link href="/api/auth/logout" className={styles.logout}>LOGOUT</Link>
      </main>
    )
  }

  character = character[0]

  return (
    <div>
      <Head>
        <title>{`${character.frontname} | Cyberpunk 2377 Nightmarket`}</title>
        <meta name="description" content={`Account page of ${character.frontname}`} />
      </Head>

      <main className={styles.account}>
        <div className={styles.title}>
          <p>{`NEURALINE AGENT: ${character.frontname}`}</p>
          <p>{`EUROBUCKS: ${character.eddies.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
        </div>
          <Link href="/api/auth/logout" className={styles.logout}>LOGOUT</Link>
      </main>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const character = await getCharacter(session.user.email)

    return {props: {
      user: session.user,
      character: character
    }};
  }
});
