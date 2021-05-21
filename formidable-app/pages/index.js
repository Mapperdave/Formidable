// https://nextjs.org/learn/basics/data-fetching/request-time

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';
import { useSession } from 'next-auth/client';

export default function Home() {

  const [ session, loading ] = useSession();
  
  if ( session || loading ) {
    return (
      <Layout>
        <div className={styles.homeContentDiv}>
          <div>
            <Link href="/forms/edit">
              <a>
                <div className={styles.createFormButton}>Create form</div>
              </a>
            </Link>
          </div>
          <div className={styles.myFormsDiv}>
            <h3>Published forms</h3>
            {// Lägg till kod för att display:a forms som tar emot svar
            }
            <h3>Form drafts</h3>
            {// Lägg till kod för att display:a forms som inte publicerats än
            }
          </div>
        </div>
      </Layout>
    )
  }
  else {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <div>
          <p>Info....</p>
        </div>
      </Layout>
    )
  }
}
