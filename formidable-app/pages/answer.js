import React, { useState } from 'react';
import axios from 'axios';
import FormAnswer from '../components/form_answer';
import useSWR from 'swr';
import styles from '../styles/Answer.module.css'
import { useRouter } from 'next/router';
import Head from 'next/head';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Answer() {
 
  const router = useRouter();
  const query = router.query.form; 
  const url = `../api/get_form?form=${query}`;  

  const { data, error } = useSWR( url, fetcher );
  const [ answer, setAnswer ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  
  // What the user sees if loading failed
  if (error) {
    return(
      <div>
        <div className={styles.mobileHeader}>
          <h3>FORMidable</h3>
        </div>
        <div className={styles.centerDiv}>
          Failed to load the form...
        </div>
      </div>
    )
  }
  // What the user sees while loading
  if (!data) {
    return(
      <div>
        <div className={styles.mobileHeader}>
          <h3>FORMidable</h3>
        </div>
        <div className={styles.centerDiv}>
          <div className={styles.loader}></div>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('../api/save_answer', {
      formId: data._id,
      answer: answer,
      keys: data.keys
    })
    .then()
    .catch(err => console.log(err));
    setSubmitted(true);
  }

  const renderQuestions = data.components.map((component, i) => {
    return(
      React.createElement(FormAnswer, {
        key: data.keys[i],
        id: data.keys[i],
        type: component,
        question: data.questions[i],
        options: data.options[i],
        answer: answer,
        setAnswer: setAnswer
      })
    )
  });

  return (
    <div>
      <Head>
        <title>{`Answer ${data.name} - FORMidable`}</title>
      </Head>
      <div className={styles.mobileHeader}>
        <h3>FORMidable</h3>
      </div>
      <div className={styles.answerFormDiv}>
        {submitted ? (
          <>
            <h1 className={styles.formTitle}>{data.name}</h1>
            <p className={styles.formDescription}>Your response has been recorded.</p>
            <a href={`${window.location.pathname}?form=${query}`}>Submit another response</a>
          </>
        ) : (
          <>
            <div>
              <p className={styles.formTitle}>{data.name}</p>
              <p className={styles.formDescription}>{data.description}</p>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
              {renderQuestions}
              <input type='submit' value='Submit answer'/>
            </form>
          </>
        )} 
      </div>
    </div>
  )
}
