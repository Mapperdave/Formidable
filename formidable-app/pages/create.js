import React, { useState, useEffect } from 'react';
import Checkboxes from '../components/form/checkboxes'
import Dropdown from '../components/form/dropdown'
import MultChoice from '../components/form/multiple_choice'
import Text from '../components/form/text'
import Default from '../components/form/default'

// Maps string inputs inside the form JSON-objects to different from components
const Components = {
  default: Default,
  text: Text,
  checkboxes: Checkboxes,
  dropdown: Dropdown,
  multChoice: MultChoice
}

export default function Create() {
  
  const [ form, updateForm ] = useState([{component: 'default'}]);

  useEffect(() => {
    // document.title = `Test ${form}`;
  });

  const renderForm = form.map((item, i) => {

    return(
      React.createElement(Components[item.component], {
        key: i,
        updateForm: updateForm,
        form: form,
        id: i
      })
    )
  });

  return(
      <div>
        {renderForm}
      </div>
  );
}