import React from 'react';

const LabelComponent = (props) => {

    return (
        <label className={props.labelStyle}>
            {props.labelName}
        </label>
    )
}
export default LabelComponent;