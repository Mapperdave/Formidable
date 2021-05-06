import React, { useState, useEffect } from 'react';
import Checkboxes from '../components/form/checkboxes'
import Dropdown from '../components/form/dropdown'
import MultChoice from '../components/form/multiple_choice'
import Text from '../components/form/text'


// Maps string inputs inside the form JSON-objects to different from components
const Components = {
  multChoice: MultChoice,
  checkboxes: Checkboxes,
  dropdown: Dropdown,
  text: Text,
}

export default function Create() {
  
  const [ name, setName ] = useState('Untitled form');
  const [ editingName, setEditingName ] = useState(false);

  const [ description, setDescription ] = useState('Form description');
  const [ editingDescription, setEditingDescription ] = useState(false);

  const [ form, updateForm ] = useState({
    name: name,
    description: description,
    components: [{
      type: 'multChoice',
      question: 'Question',
      options: ['Option 1']
    }]
  });

  // Updates title when name is changed
  useEffect(() => {
    document.title = `${form.name} - FORMidable`;
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

  const renderEditableText2 = (form, editing, setEdit, ...paths) => {
    if (editing) {
      return (
        <input type='text' id='name' value={''} autoFocus onChange={(e) => setText(e.target.value)}  onBlur={() => setEdit(false)}/>
      )
    }
    return(
      <p onClick={() => setEdit(true)}>{''}</p>
    )
  };

  const renderForm = form.components.map((component, i) => {
    return(
      React.createElement(Components[component.type], {
        key: i,
        id: i,
        form: form,
        updateForm: updateForm,
        renderEditableText: renderEditableText,
      })
    )
  });

  return(
      <div>
        <div>
          <div>
            {/* {renderEditableText(name, editingName, setName, setEditingName)} */}
            {renderEditableText2(form, editingName, setEditingName, 'name')}
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
