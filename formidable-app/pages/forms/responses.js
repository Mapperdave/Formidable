import React, { useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import FormRespons from '../../components/form_respons';
import useSWR from 'swr';
import styles from '../../styles/Answer.module.css';
import Layout from '../../components/layout';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Responses({}) {
 
  const query = '60a40494635f6018e8028eb3';
  const url = `http://localhost:3000/api/get_responses?formId=${query}`;

  const { data, error } = useSWR( url, fetcher );

  const [ resId, setResId ] = useState(0);

  // What the user sees if loading failed
  if (error) {
    return(
      <div>
        Failed to load the form...
      </div>
    )
  }
  // What the user sees while loading
  if (!data) {
    return(
      <div className={styles.loader}></div>
    )
  }

  const nRes = data.responses.length
  // What the user sees if there are no reponses yet
  if (nRes === 0) {
    return (
      <div>
        No responses
      </div>
    )
  }

  const prevButton = () => {
    return(
      <div>
        {resId === 0 ? (
          <button disabled>Prev</button>
        ) : (
          <button onClick={(e) => {setResId(resId-1)}}>Prev</button>
        )}
      </div>
    )
  }

  const nextButton = () => {
    return(
      <div>
        {resId === nRes-1 ? (
          <button disabled>Next</button>
        ) : (
          <button onClick={(e) => {setResId(resId+1)}}>Next</button>
        )}
      </div>
    )
  }
  
  const renderRespons = data.form.components.map((component, i) => {
    return(
      React.createElement(FormRespons, {
        key: i,
        id: data.form.keys[i],
        type: component,
        question: data.form.questions[i],
        options: data.form.options[i],
        respons: data.responses[resId].answer
      })
    )
  });

  return (
    <Layout>
      <div>
        <div>
          {prevButton()}
          <p>{resId+1} of {nRes}</p>
          {nextButton()}
        </div>
        <div>
          <p>{data.form.name}</p>
        </div>
        <div>
          <p>{data.form.description}</p>
        </div>
        <div>
          {renderRespons}
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
