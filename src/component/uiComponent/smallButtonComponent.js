import React from 'react';
const SmallButtonComponent = props => {
    return(
        <button className={props.className} onClick={props.onFunctionCall}><h4>{props.buttonName}</h4></button>
    )
}

export default SmallButtonComponent;