// https://nextjs.org/learn/basics/data-fetching/request-time

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/Home.module.css';
import { getSortedPostsData } from '../lib/posts';
import { signIn, signOut, useSession } from 'next-auth/client';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
// Dynamic routing example
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               <Link href={`/posts/${id}`}>
//                 <a>{title}</a>
//               </Link>
//               <br />
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     

export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
        {/* <meta className="google-signin-client_id" content="186401673095-47ik76fi94il15hqn9qh9r5ic229pn3d.apps.googleusercontent.com" ></meta> */}
      </Head>
      <div>
        HejHej
      </div>

    </Layout>
  )
}

