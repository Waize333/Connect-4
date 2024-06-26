import React from 'react';

const Footer = ({onNewGameClick,onSuggestClick}) => {
  return (
    <div className='panel Footer'>
        <button className='Footer-button'onClick={onNewGameClick}>New Game</button>
        <button className='Footer-button'onClick={onSuggestClick}>SUGGEST</button>
    </div>
  );
}

export default Footer;
