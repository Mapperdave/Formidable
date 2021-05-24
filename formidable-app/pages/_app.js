import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import '@fortawesome/fontawesome-svg-core/styles.css';  // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default function MyApp({ Component, pageProps }) {
  return(
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
