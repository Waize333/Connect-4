import React from 'react';

const Footer = ({onClickEvent}) => {
  return (
    <div className='panel Footer'>
        <button className='Footer-button'onClick={onClickEvent}>New Game</button>
    </div>
  );
}

export default Footer;
