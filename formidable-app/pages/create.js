import React, { useState, useEffect } from 'react';
import Checkboxes from '../components/form/checkboxes';
import Dropdown from '../components/form/dropdown';
import MultChoice from '../components/form/multiple_choice';
import Text from '../components/form/text';
import Layout from '../components/layout';

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

  const handleChange = (event, value, setValue, id, optInd) => {
    let newForm = Object.assign({}, form);

    // name & description: key returns an item
    if (typeof id === 'undefined') {
      setValue(event.target.value);
      newForm[event.target.name] = event.target.value;
    } else {
      // questions: key returns array
      if (typeof optInd === 'undefined') {
        setValue(event.target.value);
        newForm[event.target.name][id] = event.target.value;
        // options: key returns multi array
      } else {
        value[optInd] = event.target.value;
        setValue(value);
        newForm[event.target.name][id] = value;
      }
    }
    setForm(newForm);
  }

  const handleValue = (value, i) => {
    // Needed if value is an array, like for options
    if (typeof i === 'undefined') {
      return value;
    } 
    return value[i];
  }

  const setOptionsEdit = (editing, setEdit, i, bool, event) => {
    event.preventDefault();
    
    let newEditing = [...editing];
    newEditing[i] = bool;
    setEdit(newEditing);
  }

  const renderEditableText = (value, editing, setValue, setEdit, key, id, optInd) => {
    // options: Checks if editing is array 
    if (typeof editing === 'object') {
      if (editing[optInd]) {
        return (
          <input type='text' 
            name={key}
            value={handleValue(value, optInd)}
            autoFocus
            onFocus={(e) => e.target.select()}
            onChange={(e) => {handleChange(e, value, setValue, id, optInd)}}
            onBlur={(e) => setOptionsEdit(editing, setEdit, optInd, false, e)}/>
        );
      } else {
        return(
          <p onClick={(e) => setOptionsEdit(editing, setEdit, optInd, true, e)}>{handleValue(value, optInd)}</p>
        )
      }
    } else {
      if (editing) {
        return (
          <input type='text' 
            name={key}
            value={handleValue(value, optInd)}
            autoFocus
            onFocus={(e) => e.target.select()}
            onChange={(e) => {handleChange(e, value, setValue, id, optInd)}}
            onBlur={() => setEdit(false)}/>
        );
      }
    }
    return(
      <p onClick={() => setEdit(true)}>{handleValue(value, optInd)}</p>
    )
  };

  // TODO: Something inside the components array need to change for the component to update properly
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

  const testFunction = (e) => {
    e.preventDefault();
    console.log(form);
  }

  return(
    <Layout>
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
        <button onClick={testFunction}>Log form state</button>
      </div>
    </Layout>
  );
}
