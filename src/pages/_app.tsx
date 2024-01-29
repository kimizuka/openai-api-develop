// import 'destyle.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { PageStateProvider } from '@/contexts/PageStateContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageStateProvider>
      <Component {...pageProps} />
    </PageStateProvider>
  );
}
