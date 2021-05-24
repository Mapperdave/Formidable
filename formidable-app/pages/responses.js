import React, { useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import FormRespons from '../components/form_respons';
import useSWR from 'swr';
import editStyles from '../styles/Edit.module.css';
import styles from '../styles/Responses.module.css';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Responses() {
 
  const router = useRouter();
  const query = router.query.form; 
  const url = `http://localhost:3000/api/get_responses?form=${query}`;

  const { data, error } = useSWR( url, fetcher );

  const [ resId, setResId ] = useState(0);

  // What the user sees if loading failed
  if (error) {
    return(
      <Layout>
        <div className={styles.mainDiv}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <p>Failed to load the form...</p>
        </div>
      </Layout>
    )
  }
  // What the user sees while loading
  if (!data) {
    return(
      <Layout>
        <div className={styles.mainDiv}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <div className={styles.loader}></div>
        </div>
      </Layout>
    )
  }

  const nRes = data.responses.length

  const prevButton = () => {
    return(
      <div>
        {resId === 0 ? (
          <button disabled>{"<"}</button>
        ) : (
          <button onClick={(e) => {setResId(resId-1)}}>{"<"}</button>
        )}
      </div>
    )
  }

  const nextButton = () => {
    return(
      <div>
        {resId === nRes-1 ? (
          <button disabled>{">"}</button>
        ) : (
          <button onClick={() => {setResId(resId+1)}}>{">"}</button>
        )}
      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.mainDiv}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
        <div className={styles.responsesDiv}>
          {(nRes === 0) ? (
            // What the user sees if there are no reponses yet
            <div>
              No responses
            </div>
          ) : (
            // Display responses
            <>
              <div className={styles.respInfoDiv}>
              <div>{nRes} responses</div>
              <div>
                {prevButton()}
                <p>{resId+1} of {nRes}</p>
                {nextButton()}
              </div>
              </div>
              <div className={editStyles.section}>
                <p className={editStyles.formTitle}>{data.form.name}</p>
                <p className={editStyles.formDescription}>{data.form.description}</p>
              </div>
              <div className={editStyles.section}>
                {data.form.components.map((component, i) => {
                  return (
                    React.createElement(FormRespons, {
                      key: `${resId}_${i}`,
                      id: data.form.keys[i],
                      type: component,
                      question: data.form.questions[i],
                      options: data.form.options[i],
                      respons: data.responses[resId].answer
                    })
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {props: {}};
}
