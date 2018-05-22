import React from 'react';
import './InputBox.css';

const InputBox = ({onURLInput}) => {
    return (
        <div className="inputbg tc ma2 pa3 w-40 center shadow-1">
        <input onChange={onURLInput} className="input-reset ba b--black-20 pa2 w-80" type="text" id="imageUrl" placeholder="Enter Image URL" />
        <button className="f6 link dim br3 ph3 pv2 mb2 dib white bg-purple grow">Detect</button>
        </div>
    );
}

export default InputBox;