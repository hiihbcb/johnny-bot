import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/pages/Home.module.scss'
import bg from '../public/images/bg.jpg'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage | Cyberpunk 2377 Nightmarket</title>
        <meta name="description" content="Homepage of the Cyberpunk red nightmarket set in the 2377 universe of Serpents eye" />
      </Head>

      <main style={{ backgroundImage: `url(${bg.src})` }} className={styles.background} />
    </div>
  )
}
