import React from 'react';

export default function Checkboxes({updateForm, form, id}) {

  const addQuestion = (e) => {
    e.preventDefault();
    updateForm(form => [...form, {component: 'default'}]);
  };

  const handleChange = (e) => {

    console.log('In checkboxes!');
    
    let newForm = [...form];
    newForm[id].component = e.target.id;
    console.log(newForm);
    updateForm(newForm);

  };

  return(
    <div>
      <form>
        <input id="text" name="test" value="text" type="radio" onChange={handleChange}/>
        <label>Text</label><br></br>
        <input id="multChoice" name="test" value="multChoice" type="radio" onChange={handleChange}/>
        <label>Multiple Choice</label><br></br>
        <input id="checkboxes" name="test" value="checkboxes" type="radio" checked onChange={handleChange}/>
        <label>Checkboxes</label><br></br>
        <input id="dropdown" name="test" value="dropdown" type="radio" onChange={handleChange}/>
        <label>Dropdown</label><br></br>
        <button onClick={addQuestion}>Add question</button>
      </form>
    </div>
  )
}