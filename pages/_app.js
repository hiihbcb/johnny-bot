import '../styles/globals.scss'
import { Header } from '../lib/components'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
