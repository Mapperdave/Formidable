// https://nextjs.org/learn/basics/data-fetching/request-time

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import FormsList from '../components/forms_list';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import { useSession } from 'next-auth/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faQrcode, faCog, faShieldAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

  const [ session, loading ] = useSession();

  if ( loading ) {
    return (
      <Layout/>
    )
  }
  else {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        { session ? (
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
              <FormsList published />
              <h3>Form drafts</h3>
              <FormsList published={false}/>
            </div>
          </div>
        ) : (
          <div className={styles.homeContentDiv}>
            <div className={styles.homeHeader}>
              <h1 className={utilStyles.heading2Xl}>FORMidable</h1>
            </div>
            <div className={styles.infoRowsDiv}>
              <div className={styles.infoRow}>
                <div className={styles.icon}>          
                  <FontAwesomeIcon icon={faFile} size="2x"></FontAwesomeIcon>
                </div>
                <div>The easy way to create and handle your forms.</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faQrcode} size="2x"></FontAwesomeIcon>
                </div>
                <div>Let everyone in the room answer with our seamless QR-sharing, or copy and share the link.</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faCog} size="2x"></FontAwesomeIcon>
                </div>
                <div>Control access to your forms with publishing functionality.</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faShieldAlt} size="2x"></FontAwesomeIcon>
                </div>
                <div>Feel safe with state of the art security.</div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faLightbulb} size="2x"></FontAwesomeIcon>
                </div>
                <div>It's FORMidable!</div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    )
  }
}
