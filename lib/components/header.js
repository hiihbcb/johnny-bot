import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/components/Header.module.scss'
import { useState, useEffect } from 'react'
import { getCategories } from '../web/apis'
import { useUser } from '@auth0/nextjs-auth0/client';

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
        <AccountButton/>
      </>
    )
  }
}

async function setCategories(setMenu) {
  let data = await getCategories()
  setMenu(data)
}

function AccountButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return <Link className={styles.account} href={'/account'}>Account</Link>
  } else {
    return <a className={styles.account} onClick={popupAuth0}>Login</a>
  }
}

function popupAuth0() {
  let w = 500
  let h = 720

  const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop

  var url = "/api/auth/login?returnTo=/account/success"
  let params = [
    "width="+w,
    "height="+h,
    "top="+top,
    "left="+left
  ]

  window.open(url,'popup', params.join(","))
}
