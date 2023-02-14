import React from 'react';
import './myButton.css';

export default function MyButton({ name, disabled }) {

// button color change
  const handleMouseMove = (e) => {
    const butt = e.target
    const rect = butt.getBoundingClientRect(); // has to bound on the element the background position is set with xy

    const x = (e.clientX - rect.left) * 100 / butt.clientWidth;
    const y = (e.clientY - rect.top) * 100 / butt.clientHeight;
    butt.style.setProperty('--mouse-x', x);
    butt.style.setProperty('--mouse-y', y);
}
  return (
    <div className='button-div'>
      <button disabled={disabled}>
            <span onMouseMove={handleMouseMove} className='outer-span'><span className='inner-span'></span></span>
            <span className='lower-span'>{name}</span>
        </button>
    </div>
  )
}
