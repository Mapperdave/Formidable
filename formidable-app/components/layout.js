import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const name = 'FORMidable';
export const siteTitle = 'FORMidable';

export default function Layout({ children, home }) {
  
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head></Head>
      <header>
        <div className={styles.globalHeader}>
          <>
            {session ? (
              <>
                <div>
                  <Link href="/">
                    <a>
                      <h2 className={utilStyles.headingLg}>{name}</h2>
                    </a>
                  </Link>
                </div>
                <div className={styles.loggedInUser}>{session.user.email}</div>
              </>
            ) : (
              <div/>
            )}
            <div className={styles.buttonDiv}>
              {!session ? (
                <>
                  <button id="logInHeaderButton" onClick={signIn}>LOG IN</button>
                  <Link href='/signup'>
                    <button className={styles.signUpButton}>SIGN UP</button>
                  </Link>
                </>
              ) : (
                <>
                  {/* <p classname={styles.emailDropdown}>{session.user.email} </p> */}
                  <button onClick={signOut}>LOG OUT</button>
                </>
              )}
            </div>
          </>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}