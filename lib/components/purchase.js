import styles from '../../styles/components/Purchase.module.scss'
import { useState } from 'react'
import { setEddies, getCharacter } from '../web/apis'

var count = 0

export default function Purchase({ email, eddies }) {
  const [openModal, setOpenModal] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <>
      <a className={styles.button} onClick={() => handlePurchase(setOpenModal, setCount, email, eddies)} >{'Buy'}</a>
      <EddiesPopup  isOpen={openModal} setOpen={setOpenModal} count={count} />
    </>
  )
}

async function handlePurchase(setOpenModal, setCount, email, eddies) {
  let character = await getCharacter(email)
  let newEddies = character[0].eddies - eddies
  let oldEddies = character[0].eddies

  setEddies(character[0].playerid, newEddies)

  if (oldEddies > newEddies) {
    setOpenModal(true)
    for (let i = oldEddies; i > newEddies; i = i - 8) {
      await delay(1)
      setCount(i)
    }
    setCount(newEddies)
    await delay(2000)
    setOpenModal(false)
  }
}

function EddiesPopup({ isOpen, setOpen, count }) {
  if (isOpen) {
    return (
      <div className={styles.modal}>
        <p>{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}eb</p>
      </div>
    )
  }
}

function delay( milliseconds ) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
