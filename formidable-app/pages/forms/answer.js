import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout';
import FormAnswer from '../../components/form_answer';

export default function Answer({ form }) {
  
  const [ answer, setAnswer ] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    console.log(answer);
  }

  const renderQuestions = form.components.map((component, i) => {
    return(
      React.createElement(FormAnswer, {
        key: i,
        id: i,
        type: component,
        question: form.questions[i],
        options: form.options[i],
        answer: answer,
        setAnswer: setAnswer
      })
    )
  });

  return (
    <Layout>
      <div>
        <div>
          <p>{form.name}</p>
          <p>{form.description}</p>
        </div>
        <div>
          {renderQuestions}
        </div>
        <button onClick={e => handleSubmit(e)}>Submit answer</button>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const form = await axios.get( `${process.env.URL}/api/get_form`, {
    params: {
      formId: '60a23f3a83c9e916943e5bff',
    }
  })
  .catch(err => console.log(err));

  return {props: { form: form.data }};
}