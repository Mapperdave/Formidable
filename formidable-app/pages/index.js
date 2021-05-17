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
        <Link href="/forms/edit">
          <a>Create form</a>
        </Link>
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
