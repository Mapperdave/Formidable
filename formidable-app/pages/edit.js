import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Layout from '../components/layout';
import styles from '../styles/Edit.module.css';
import FormQuestion from '../components/form_question';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Edit() {

  const [ name, setName ] = useState('Untitled form');
  const [ editingName, setEditingName ] = useState(false);

  const [ description, setDescription ] = useState('Form description');
  const [ editingDescription, setEditingDescription ] = useState(false);

  const [ componentKey, setComponentKey ] = useState(0);

  const [ form, setForm ] = useState({
    name: name,
    description: description,
    components: [ 'multChoice' ],
    keys: [ componentKey ],
    questions: [ 'Question' ],
    options: [ ['Option 1'] ]
  });
  const router = useRouter();

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
          <p onClick={(e) => setOptionsEdit(editing, setEdit, optInd, true, e)}>
            {handleValue(value, optInd)}
          </p>
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

  const renderForm = form.components.map((component, i) => {
    return(
      React.createElement(FormQuestion, {
        key: form.keys[i],  // Uses the saved key to render the correct component
        type: component,
        componentKey: componentKey,
        setComponentKey: setComponentKey,
        id: i,
        form: form,
        setForm: setForm,
        renderEditableText: renderEditableText,
      })
    )
  });

  const saveForm = async (e) => {
    e.preventDefault();

    await axios.post('../api/save_form', {
      form: form,
      published: false
    })
    .then()
    .catch(err => console.log(err));

    router.push('/');
  }

  const publishForm = async (e) => {
    e.preventDefault();
    
    const formId = await axios.post('../api/save_form', {
      form: form,
      published: true
    })
    .then(res => res.data)
    .catch(err => console.log(err));

    router.push(`/publish?form=${formId}`);
  }

  return(
    <Layout>
      <div className={styles.createContentBox}>
        <div className={styles.section}>
          <div className={[styles.editableText, styles.formTitle].join(' ')}>
            {renderEditableText(name, editingName, setName, setEditingName, 'name')}
          </div>
          <div className={[styles.editableText, styles.formDescription].join(' ')}>
            {renderEditableText(description, editingDescription, setDescription, setEditingDescription, 'description')}
          </div>
        </div>
        <div>
          {renderForm}
        </div>
        <div className={styles.endButtonsDiv}>
            <Link href="/">
              <a>
                <button>Discard</button>
              </a>
            </Link>
          <button onClick={e => saveForm(e)}>Save</button>
          <button onClick={e => publishForm(e)}>Save and publish</button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {props: {}};
}
