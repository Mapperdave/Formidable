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

// export default function Home({ allPostsData }) {
//   const [session, loading] = useSession();
  
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//         <script src="https://apis.google.com/js/platform.js" async defer></script>
//         <meta className="google-signin-client_id" content="186401673095-47ik76fi94il15hqn9qh9r5ic229pn3d.apps.googleusercontent.com" ></meta>
//       </Head>
//       <div className={styles.authenticationBox}>
//         <div className={styles.authenticationHeaderBox}>
//           <h1>Sign In</h1>
//           <h1>Sign Up</h1>
//         </div>
//         <div className={styles.logInContentBox}>
//           <form>
//             <input id="email" type="email" placeholder="email" required />
//             <input id="password" type="password" placeholder="password" required />
//             <button type="submit">Sign In</button>
//           </form>
//           <div className="g-signin2" data-onsuccess="onSignIn"></div>
//           <div className={styles.GoogleBox}>
//             <p>Log in with</p>
//             <div className={styles.GoogleImgBox}>
//               <Image
//                 src="/images/Google-Logo.png"
//                 layout="fill"
//                 objectFit="cover"
//                 alt="Gooogle"
//               /> 
//             </div>
//           </div>
//         </div>
//       </div>
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
//     </Layout>
//   )
// }



// MÅNS SHIT
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// <a href="#" onclick="signOut();">Sign out</a>
// <script>
//   function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }
// </script>

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

