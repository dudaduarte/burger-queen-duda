import React from 'react';

function Button (prop) {
    return (
        <button className="button" onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button;