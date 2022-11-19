import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/components/Header.module.scss'
import { useState } from 'react'

function Header() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <header className={styles.head}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className={styles.logo}>
        <Link href="/">2377</Link>
      </span>
      <span className={styles.desktop}>
        <Menu/>
      </span>
      <span className={styles.mobile}>
         <a className={styles.button} onClick={() => setOpenModal(true)} >Menu</a>
      </span>
      <MobileMenu isOpen={openModal} close={() => setOpenModal(false)} />
    </header>
  )
}

function MobileMenu({isOpen, close}) {
  if (isOpen) {
    return (
      <div className={styles.modal}>
        <span className={styles.mlogo}>
          <Link href="/" onClick={close}>2377</Link>
        </span>
        <div className={styles.mobilemenu} onClick={close}>
          <Menu/>
        </div>
        <a className={styles.mclose} onClick={close}>Close</a>
      </div>
    )
  }
}

function Menu() {
  return (
    <>
      <Link className={styles.item} href="/weapons">Weapons</Link>
      <Link className={styles.item} href="/armour">Armour</Link>
      <Link className={styles.item} href="/cybertech">Cybertech</Link>
      <Link className={styles.item} href="/netware">Netware</Link>
      <Link className={styles.item} href="/gear">Gear</Link>
      <Link className={styles.item} href="/vehicles">Vehicles</Link>
      <Link className={styles.item} href="/insurance">Insurance</Link>
    </>
  )
}

export default Header
