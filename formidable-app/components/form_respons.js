import React from 'react';
import styles from './form_respons.module.css'


export default function FormRespons( { id, type, question, options, respons } ) {

  const renderOptions = () => {
    return(
      <>
        { type === 'dropdown' ? (
          <select disabled>
            {typeof(respons[id]) !== 'undefined' ? (
              <option>{options[respons[id]]}</option>
            ) : (
              <option>Choose</option>
            )}
          </select>
        ) : ( type === 'checkboxes' ? (
          <>
            {options.map((opt, i) => {
              if (typeof(respons[id]) === 'undefined') {
                return(
                  <label key={i}>
                    <input type='checkbox' disabled checked={false}/>
                    {opt}
                    <br/>
                  </label>
                )
              } else {
                return (
                  <label key={i}>
                    {respons[id].includes(i) ? (
                      <input type='checkbox' disabled checked/>
                      ) : ( 
                        <input type='checkbox' disabled checked={false}/>
                        )}
                    {opt}
                    <br />
                  </label>
                )
              }
            })}
          </>

        ) : ( type === 'multChoice' ? (
          <>
            {options.map((opt, i) => {
              return (
                <label key={i}>
                  {typeof(respons[id]) !== 'undefined' && respons[id] === i ? (
                    <input type='radio' name={id} disabled checked/>
                    ) : (
                    <input type='radio' name={id} disabled/>
                  )}
                  {opt}
                  <br />
                </label>
              )
            })}
          </>
        ) : (
        <>
          {typeof(respons[id]) !== 'undefined' ? (
            <input type='text' value={respons[id]} disabled/>
          ) : (
            <input type='text' value='' disabled/>
          )}
        </>
        )))}
      </>
    )
  }

  return(
    <div className={styles.questionDiv}>
      <p className={styles.question}>{question}</p>
      {renderOptions()}
    </div>
  )
}