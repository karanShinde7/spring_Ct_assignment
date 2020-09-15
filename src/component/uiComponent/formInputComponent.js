import React from 'react';
import LabelComponent from './LabelComponent';

const FormInputComponent = props => {
    return (
        <div className="form-group">
            <LabelComponent labelName={props.label} labelStyle="login-label-style"></LabelComponent>
            <input type={props.type} className={props.className} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChangeFunction} required={props.required} />
        </div>
    )
}

export default FormInputComponent;