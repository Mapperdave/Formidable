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

  const [ form, setForm ] = useState({
    name: name,
    description: description,
    components: [ 'multChoice' ],
    questions: [ 'Question' ],
    options: [['Option 1']]
    
  });

  // Updates title when name is changed
  useEffect(() => {
    document.title = `${name} - FORMidable`;
  },[name]);

  // THIS FUNCTION NEEDS FIXING
  const handleChange = (value, setValue, key, id) => {
    let newForm = Object.assign({}, form);
    if(typeof id === 'undefined') {
      setValue(value);
      newForm[key] = value;
    } else {
      setValue()
      newForm[key][id] = value;
    }
    setForm(newForm);
  }

  const renderEditableText = (value, editing, setValue, setEdit, key, id) => {
    if (editing) {
      return (
        <input type='text' id='name' value={value} autoFocus onChange={(e) => {handleChange(e.target.value, setValue, key, id)}}  onBlur={() => setEdit(false)}/>
      )
    }
    return(
      <p onClick={() => setEdit(true)}>{text}</p>
    )
  };


  const renderForm = form.components.map((component, i) => {
    return(
      React.createElement(Components[component], {
        key: i,
        id: i,
        form: form,
        setForm: setForm,
        renderEditableText: renderEditableText,
      })
    )
  });

  return(
      <div>
        <div>
          <div>
            {renderEditableText(name, editingName, setName, setEditingName, 'name')}
          </div>
          <div>
            {renderEditableText(description, editingDescription, setDescription, setEditingDescription, 'description')}
          </div>
        </div>
        <div>
          {renderForm}
        </div>
      </div>
  );
}
