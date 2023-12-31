import { Provider as AppContextProvider  } from '../contexts/app'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp
