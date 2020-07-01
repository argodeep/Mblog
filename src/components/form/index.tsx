import React, { useState, Fragment } from 'react';
import './style.css';


function Form(props: any) {

  // Form Fields
  const [text, setText] = useState<string>('');


  async function submit() {
    props.onChange({ text: text });
    setText('')
  }



  return (
    <Fragment>
      <div className="form-input">
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      <button type="button" onClick={() => submit()}>{props.buttonLabel}</button>
      </div>
    </Fragment>
  );
}

export default Form;
