import React, { useState, useEffect } from 'react';

export default function MultChoice({id, form, setForm, renderEditableText}) {

  const [ question, setQeustion ] = useState('Question');
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const [ options , setOptions ] = useState([ 'Option 1' ]);
  const [ editingOptions, setEditingOptions ] = useState(false);

  //TODO: Make Options editable
  const renderOptions = options.map((option, i) => {
    return(
      <div key={i}>
        <input type='radio' name={id} id={i} disabled/>
        {renderEditableText(options[i], editingOptions, setOptions, setEditingOptions, 'options', id)}
      </div>
    )
  });

  const addQuestion = (e) => {
    e.preventDefault();

    let newForm = Object.assign({}, form); // Treats state as immutable
    newForm.components.splice(id+1, 0, 'multChoice');
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

    let newForm = Object.assign({}, form);
    newForm.options[id] = options;
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

  const testFunction = (e) => {
    e.preventDefault();
    
    console.log(form);
  }

  return(
    <div>
      <div>
        {renderEditableText(question, editingQuestion, setQeustion, setEditingQuestion, 'questions', id)}
      </div>
      <div>
        <form>
          {renderOptions}
          <button onClick={addOption}>Add option</button>
        </form>
      </div>
      <div>
        <form>
          <select name='formType' id='formType' defaultValue={'multChoice'} onChange={handleChange}>
            <option value='multChoice'>Multiple choice</option>
            <option value='checkboxes'>Checkboxes</option>
            <option value='dropdown'>Drop-down</option>
            <option value='text'>Text</option>
          </select>
          <br></br>
          <button onClick={addQuestion}>Add question</button>
          <button onClick={testFunction}>Test</button>
        </form>
      </div>
    </div>
  )
}