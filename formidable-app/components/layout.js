import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'FORMidable'
export const siteTitle = 'FORMidable'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        
      </Head>
      <header>
        {home ? (
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
        ) : (
          <>
            <Link href="/">
              <a>
                <h2 className={utilStyles.headingLg, styles.smallHeaderText}>{name}</h2>
              </a>
            </Link>
          </>  
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