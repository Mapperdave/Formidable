import React, { useState } from 'react';
import axios from 'axios';
import FormAnswer from '../components/form_answer';
import useSWR from 'swr';
import styles from '../styles/Answer.module.css'
import { useRouter } from 'next/router';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Answer() {
 
  // const router = useRouter();
  // const query = router.query.form; 
  // const query = '60a40494635f6018e8028eb3'; // Måns
  const query = '60aa93f9ac3c4b19f034ab58'; // Vera
  const url = `http://localhost:3000/api/get_form?formId=${query}`;  

  const { data, error } = useSWR( url, fetcher );
  const [ answer, setAnswer ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  
  // What the user sees if loading failed
  if (error) {
    return(
      <div className={styles.centerDiv}>
        Failed to load the form...
      </div>
    )
  }
  // What the user sees while loading
  if (!data) {
    return(
      <div className={styles.centerDiv}>
        <div className={styles.loader}></div>
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
      <div className={styles.mobileHeader}>
        <h3>FORMidable</h3>
      </div>
      <div className={styles.answerFormDiv}>
        {submitted ? (
          <>
            <h1 className={styles.formTitle}>{data.name}</h1>
            <p className={styles.formDescription}>Your response has been recorded.</p>
            <a href={window.location.pathname}>Submit another response</a>
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
