import React, { useState } from 'react';
import styles from './form.module.css'

export default function MultChoice({id, form, setForm, renderEditableText}) {

  const [ question, setQeustion ] = useState(form.questions[id]);
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const addQuestion = (e) => {
    e.preventDefault();
    
    let newForm = Object.assign({}, form); // Treats state as immutable
    newForm.components.splice(id+1, 0, 'multChoice');
    newForm.questions.splice(id+1, 0, 'Question');
    newForm.options.splice(id+1, 0, ['Option 1']);
    setForm(newForm);
  }

  const handleChange = (e) => {
    let newForm = Object.assign({}, form);
    newForm.components[id] = e.target.value;
    newForm.options[id] = ['Option 1'];
    setForm(newForm);
  }

  return(
    <div>
      <div className={styles.questionDiv}>
        <div>
          {renderEditableText(question, editingQuestion, setQeustion, setEditingQuestion, 'questions', id)}
        </div>
        <div>
          <p className={styles.textAnswer}>Text answer</p>
        </div>
        <form>
          <select name='setComponent' defaultValue={'text'} onChange={handleChange}>
            <option value='multChoice'>Multiple choice</option>
            <option value='checkboxes'>Checkboxes</option>
            <option value='dropdown'>Drop-down</option>
            <option value='text'>Text</option>
          </select>
        </form>
      </div>
      <div>
        <button onClick={addQuestion}>Add question</button>
      </div>
    </div>
  )
}