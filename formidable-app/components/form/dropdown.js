import React, { useState } from 'react';

export default function MultChoice({id, form, setForm, renderEditableText}) {

  const [ question, setQeustion ] = useState(form.questions[id]);
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const [ options , setOptions ] = useState([...form.options[id]]);
  const [ editingOptions, setEditingOptions ] = useState([ false ]);

  const renderOptions = options.map((_, i) => {
    return(
      <div key={`option_${id}_${i}`}>
        <p>{i+1}. </p>
        {renderEditableText(options, editingOptions, setOptions, setEditingOptions, 'options', id, i)}
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
          <select name='setComponent' defaultValue={'dropdown'} onChange={handleChange}>
            <option value='multChoice'>Multiple choice</option>
            <option value='checkboxes'>Checkboxes</option>
            <option value='dropdown'>Drop-down</option>
            <option value='text'>Text</option>
          </select>
          <br></br>
          <button onClick={addQuestion}>Add question</button>
        </form>
      </div>
    </div>
  )
}