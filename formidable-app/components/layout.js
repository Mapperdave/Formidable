import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client';

const name = 'FORMidable'
export const siteTitle = 'FORMidable'

export default function Layout({ children, home, activeSession }) {
  return (
    <div className={styles.container}>
      <Head>
        
      </Head>
      <header>
        <div className={styles.globalHeader}>
          {!home ? (
            <Link href="/">
              <a>
                <h2 className={utilStyles.headingLg}>{name}</h2>
              </a>
            </Link>
          ) : (
            <div/>
          )}
          {!activeSession ? (
            <div className={styles.signInButtonDiv}>
              <button className={styles.signInButton} onClick={signIn}>Sign in</button>
              <p>/</p>
              <button className={styles.signUpButton}>Sign up</button>
            </div>
          ) : (
            <button className={styles.signInButton} onClick={signOut}>Sign out</button>
          )}
        </div>

        {home && (
          <div className={styles.homeHeader}>
            <Image
              priority
              src="/images/pexels-cytonn-photography-955389.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center bottom"
              alt={name}
            />
            <div>
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
              <p>This is a website meant for creating and sharing forms</p>
            </div>
          </div>
        )}
        
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}