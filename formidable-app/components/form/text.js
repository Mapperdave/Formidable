import React, { useState } from 'react';

export default function Text({updateForm, form, id, renderEditableText}) {

  const [ question, setQeustion ] = useState('Question');
  const [ editingQuestion, setEditingQuestion ] = useState(false);

  const addQuestion = (e) => {
    e.preventDefault();

    let newForm = [...form];
    newForm.splice(id+1, 0, {component: 'multChoice', question: 'Question', options: ['Option 1']})
    updateForm(newForm);
  };

  const handleChange = (e) => {
    
    let newForm = [...form];
    newForm[id].component = e.target.value;
    newForm[id].options = ['Option 1'];
    updateForm(newForm);
  };

  return(
    <div>
      <div>
        {renderEditableText(question, editingQuestion, setQeustion, setEditingQuestion)}
      </div>
      <div>
        <p>Text answer</p>
      </div>
      <div>
        <form>
          <select name='formType' id='formType' defaultValue={'text'} onChange={handleChange}>
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