import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/components/Header.module.scss'
import { useState, useEffect } from 'react'
import { getCategories } from '../web/apis'

export default function Header() {
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
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    setCategories(setMenu)
  }, [setMenu])

  if (menu) {
    return (
      <>
        {menu.map((item, index) => (
          <Link key={index} className={styles.item} href={`/${item.name}`}>{item.name}</Link>
        ))}
      </>
    )
  }
}

export async function setCategories(setMenu) {
  let data = await getCategories()
  console.log(data)
  setMenu(data)
}
