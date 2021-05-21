import React, { useState } from 'react';
import styles from './form_answer.module.css';

export default function FormAnswer( { id, type, question, options, answer, setAnswer } ) {

  const handleChange = (e) => {
    
    let newAnswer = Object.assign({}, answer);
    if (type === 'text') {
      newAnswer[id] = e.target.value;
    } 
    if (type === 'multChoice') {
      newAnswer[id] = parseInt(e.target.value);
    }
    if (type === 'checkboxes') {
      // Initializes new set if the first time
      if (typeof newAnswer[id] === 'undefined') {
        newAnswer[id] = [];
      }
      e.target.checked ? (
        newAnswer[id].push(parseInt(e.target.value))
      ) : (
        newAnswer[id] = newAnswer[id].filter(checkbox => checkbox !== parseInt(e.target.value))
      )
    }
    if (type === 'dropdown') {
      newAnswer[id] = parseInt(e.target.value);
    }
    
    setAnswer(newAnswer);
  }

  const renderOptions = () => {
    return(
      <>
        { type === 'dropdown' ? (
          <select defaultValue='default' onChange={e => handleChange(e)}>
            <optgroup>
              <option value='default'>Choose</option>
            </optgroup>
            <optgroup required> {/*Vet inte om det funkar att göra så här med required*/}
              {options.map((opt, i) => {
                return (<option key={i} value={i}>{opt}</option>)
              })}
            </optgroup>
          </select>

        ) : ( type === 'checkboxes' ? (
          <>
            {options.map((opt, i) => {
              return (
                <label key={i} onChange={e => handleChange(e)}>
                  <input type='checkbox' value={i}/>
                  {opt}
                  <br />
                </label>
              )
            })}
          </>

        ) : ( type === 'multChoice' ? (
          <>
            {options.map((opt, i) => {
              return (
                <label key={i} onChange={e => handleChange(e)}>
                  <input type='radio' value={i} name={id}/>
                  {opt}
                  <br />
                </label>
              )
            })}
          </>

        ) : (
        <>
          <input type='text' onBlur={e => handleChange(e)}/>
        </>
        )))}
      </>
    )
  }

  return(
    <div>
      <p className={styles.question}>{question}</p>
      {renderOptions()}
    </div>
  )
}