import React, { useState } from 'react';
import styles from './form.module.css'

export default function MultChoice({componentKey, setComponentKey, id, form, setForm, renderEditableText}) {

  const [ question, setQuestion ] = useState(form.questions[id]);
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const [ options , setOptions ] = useState([...form.options[id]]);
  const [ editingOptions, setEditingOptions ] = useState([ false ]);

  const renderOptions = options.map((_, i) => {
    return(
      <div key={`option_${id}_${i}`} className={styles.optionDiv}>
        <input type='radio' disabled/>
        {renderEditableText(options, editingOptions, setOptions, setEditingOptions, 'options', id, i)}
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
      setOptions([]);
      newForm.options[id] = [];
    }
    setForm(newForm);
  }

  return(
    <div>
      <div className={styles.questionDiv}>
        <div>
          {renderEditableText(question, editingQuestion, setQuestion, setEditingQuestion, 'questions', id)}
        </div>
        <div>
          <form>
            {renderOptions}
            <button onClick={addOption}>Add option</button>
          </form>
        </div>
        <form>
          <select name='setComponent' defaultValue={'multChoice'} onChange={handleChange}>
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