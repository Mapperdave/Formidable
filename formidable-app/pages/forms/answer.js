import React, { useState } from 'react';
import axios from 'axios';
import FormAnswer from '../../components/form_answer';
import useSWR from 'swr';


const fetcher = url => axios.get(url).then(res => res.data);

export default function Answer() {
 
  const query = '60a40494635f6018e8028eb3';
  const url = `http://localhost:3000/api/get_form?formId=${query}`;  

  const { data, error } = useSWR( url, fetcher );
  const [ answer, setAnswer ] = useState([]);
  const [ submitted, setSubmitted ] = useState(false);
  
  // What the user sees after submitting the form
  if (submitted) {
    return(
      <div>
        <h1>{data.name}</h1>
        <p>Your response has been recorded.</p>
        <a href={window.location.pathname}>Submit another response</a>
      </div>
    )
  }
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
      <div>
        Loading...
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


  const testFunction = (e) => {
    e.preventDefault();
    console.log(form);
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
      <div>
        <p>{data.name}</p>
        <p>{data.description}</p>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        {renderQuestions}
        <input type='submit' value='Submit answer'/>
      </form>
    </div>
  )
}
