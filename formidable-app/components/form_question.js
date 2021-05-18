import React, { useState } from 'react';
import styles from './form_question.module.css'

export default function FormQuestion({type, componentKey, setComponentKey, id, form, setForm, renderEditableText}) {

  const [ question, setQuestion ] = useState(form.questions[id]);
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const [ options , setOptions ] = useState([...form.options[id]]);
  const [ editingOptions, setEditingOptions ] = useState([ false ]);

  const renderOptions = options.map((_, i) => {
    return(
      <div key={i} className={styles.optionDiv}>
        { type === 'dropdown' ? (
          <p className={styles.optionType}>{i+1}.</p>
        ) : (
          type === 'checkboxes' ? (
            <input type='checkbox' className={styles.optionType} disabled/>
          ) : (
            <input type='radio' className={styles.optionType} disabled/>
          )
        )}
        <div className={styles.optionText}>
          {renderEditableText(options, editingOptions, setOptions, setEditingOptions, 'options', id, i)}
        </div>
      </div>
    )
  });

  const addQuestion = (e) => {
    e.preventDefault();
    
    setComponentKey(componentKey + 1);

    let newForm = Object.assign({}, form); // Treats state as immutable
    newForm.components.splice(id+1, 0, 'multChoice');
    newForm.keys.splice(id+1, 0, componentKey + 1);
    newForm.questions.splice(id+1, 0, 'Question');
    newForm.options.splice(id+1, 0, ['Option 1']);
    setForm(newForm);
  }

  const addOption = (e) => {
    e.preventDefault();
    const nOptions = options.length;

    let newOptions = Object.assign([], options);
    newOptions.push(`Option ${nOptions+1}`);
    setOptions(newOptions);

    let newEditingOptions = Object.assign([], editingOptions);
    newEditingOptions.push(false);
    setEditingOptions(newEditingOptions);

    let newForm = Object.assign({}, form);
    newForm.options[id] = newOptions;
    setForm(newForm);
  }

  const handleChange = (e) => {
    let newForm = Object.assign({}, form);
    newForm.components[id] = e.target.value;
    if (e.target.value === 'text') {
      setOptions([ 'Option 1' ]);
      newForm.options[id] = [ 'Option 1' ];
    }
    setForm(newForm);
  }

  return(
    <div className={styles.sectionDiv}>
      <div className={styles.questionDiv}>
        <div className={styles.editableText}>
          {renderEditableText(question, editingQuestion, setQuestion, setEditingQuestion, 'questions', id)}
        </div>
        <div>
        { type === 'text' ? (
          <p className={styles.textAnswer}>Text answer</p>
        ) : (
          <form className={styles.optionsForm}>
            {renderOptions}
            <button className={styles.addOptButton} onClick={addOption}>Add option</button>
          </form>
        )}
        </div>
        <form className={styles.questionType}>
          <select name='setComponent' defaultValue={type} onChange={handleChange}>
            <option value='multChoice'>Multiple choice</option>
            <option value='checkboxes'>Checkboxes</option>
            <option value='dropdown'>Drop-down</option>
            <option value='text'>Text</option>
          </select>
        </form>
      </div>
      <div>
        <button className={styles.addQuesButton} onClick={addQuestion}>Add question</button>
      </div>
    </div>
  )
}