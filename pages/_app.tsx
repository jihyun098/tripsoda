import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'redux/store/store'
import '../styles/globals.css'
import Header from '@components/header'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps}></Component>
    </Provider>
  )
}
