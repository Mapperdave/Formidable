import React, { useState, useEffect } from 'react';
import Checkboxes from '../components/form/checkboxes'
import Dropdown from '../components/form/dropdown'
import MultChoice from '../components/form/multiple_choice'
import Text from '../components/form/text'


// Maps string inputs inside the form JSON-objects to different from components
const Components = {
  text: Text,
  checkboxes: Checkboxes,
  dropdown: Dropdown,
  multChoice: MultChoice
}

export default function Create() {
  
  const [ name, setName ] = useState('Untitled form');
  const [ editingName, setEditingName ] = useState(false);

  const [ description, setDescription ] = useState('Form description');
  const [ editingDescription, setEditingDescription ] = useState(false);

  const [ form, updateForm ] = useState([{component: 'multChoice', question: 'Question', options: ['Option 1']}]);

  // Updates title when name is changed
  useEffect(() => {
    document.title = `${name} - FORMidable`;
  },[name]);

  const renderEditableText = (text, editing, setText, setEdit) => {
    if (editing) {
      return (
        <input type='text' id='name' value={text} autoFocus onChange={(e) => setText(e.target.value)}  onBlur={() => setEdit(false)}/>
      )
    }
    return(
      <p onClick={() => setEdit(true)}>{text}</p>
    )
  };

  const renderForm = form.map((item, i) => {
    return(
      React.createElement(Components[item.component], {
        key: i,
        updateForm: updateForm,
        form: form,
        id: i,
        renderEditableText: renderEditableText,
      })
    )
  });

  return(
      <div>
        <div>
          <div>
            {renderEditableText(name, editingName, setName, setEditingName)}
          </div>
          <div>
            {renderEditableText(description, editingDescription, setDescription, setEditingDescription)}
          </div>
        </div>
        <div>
          {renderForm}
        </div>
      </div>
  );
}