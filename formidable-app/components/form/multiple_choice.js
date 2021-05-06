import React, { useState, useEffect } from 'react';

export default function MultChoice({id, form, updateForm, renderEditableText}) {

  const [ question, setQeustion ] = useState('Question');
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  //TODO: Make it so that Question is saved in the form and stays when component is changed
  //TODO: Make Options editable

  const renderOptions = form.components[id].options.map((option, i) => {
    return(
      <div key={i}>
        <input type='radio' name={id} id={i} disabled/>{option}
        {/* {renderEditableText(optionState, editingOptions, setOptionState, setEditingOptions)} */}
      </div>
    )
  });

  const addQuestion = (e) => {
    e.preventDefault();

    let newForm = Object.assign({}, form); // Treats state as immutable
    newForm.components.splice(id+1, 0, {type: 'multChoice', question: 'Question', options: ['Option 1']});
    updateForm(newForm);
  }

  const addOption = (e) => {
    e.preventDefault();

    const nOptions = form.components[id].options.length;
    let newForm = Object.assign({}, form);
    newForm.components[id].options.push(`Option ${nOptions+1}`)
    updateForm(newForm);
  }

  const handleChange = (e) => {
    let newForm = Object.assign({}, form);
    newForm.components[id].type = e.target.value;
    if (e.target.value === 'text') {
      newForm.components[id].options = [];
    }
    updateForm(newForm);
  }

  const testFunction = (e) => {
    e.preventDefault();
    let newForm = Object.assign({}, form);
    newForm.description = "Funkar!";
    console.log(newForm);
    console.log(form);
    updateForm(newForm); 
    console.log(form);
  }

  return(
    <div>
      <div>
        {renderEditableText(question, editingQuestion, setQeustion, setEditingQuestion)}
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