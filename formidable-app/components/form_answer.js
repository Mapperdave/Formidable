import React, { useState } from 'react';
import styles from './form_question.module.css'

export default function FormAnswer( { id, type, question, options, answer, setAnswer } ) {

  const renderOptions = () => {
    return(
      <form>
        { type === 'dropdown' ? (
          <select defaultValue='default'>
            <optgroup>
              <option value='default'>Choose</option>
            </optgroup>
            <optgroup required> {/*Vet inte om det funkar att göra så här med required*/}
              {options.map((opt, i) => {
                return (<option value={i}>{opt}</option>)
              })}
            </optgroup>
          </select>

        ) : ( type === 'checkboxes' ? (
          <div>
            {options.map((opt, i) => {
              return (
                <label>
                  <input type='checkbox' value={i} name={id}/>
                  {opt}
                  <br />
                </label>
              )
            })}
          </div>

        ) : ( type === 'multChoice' ? (
          <div>
            {options.map((opt, i) => {
              return (
                <label>
                  <input type='radio' value={i} name={id}/>
                  {opt}
                  <br />
                </label>
              )
            })}
          </div>

        ) : (
        <div>
          <textarea/>
        </div>
        )))}
      </form>
    )
  }

  return(
    <div>
      <p>{question}</p>
      {renderOptions()}
    </div>
  )
}