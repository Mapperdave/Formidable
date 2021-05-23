// https://nextjs.org/learn/basics/data-fetching/request-time

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import axios from 'axios';


const fetcher = url => axios.get(url).then(res => res.data);

export default function Home() {

  const { data, error } = useSWR( 'http://localhost:3000/api/get_all_forms', fetcher );
  const [ session, loading ] = useSession();
 
  const renderForms = () => {
    if (error) {
      <div>
        Failed to load the form...
      </div>
    } else if (!data) {
      return(
        <div className={styles.loader}></div>
      )
    } else {
      return(
        data.map((form, i) => {
          return(
            <div key={i}>
              <Link href={`/responses?form=${form._id}`}>
                <a>{form.name}</a>
              </Link>
            </div>
          )
        })
      )
    }
  }

  if ( session || loading ) {
    return (
      <Layout>
        <div className={styles.homeContentDiv}>
          <div>
            <Link href="/edit">
              <a>
                <div className={styles.createFormButton}>Create form</div>
              </a>
            </Link>
          </div>
          <div className={styles.myFormsDiv}>
            <h3>Published forms</h3>
            {renderForms()}
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
