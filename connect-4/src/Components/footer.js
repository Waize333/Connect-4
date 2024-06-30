import React from 'react';

const GAME_STATE_PLAYING = 1;


const Footer = ({onNewGameClick,onSuggestClick,gameState}) => {
  const renderButtons=()=>
    {
      if( gameState===GAME_STATE_PLAYING){
        return<button className='Footer-button'onClick={onSuggestClick}>SUGGEST</button>
    }
    return<button className='Footer-button'onClick={onNewGameClick}>New Game</button>
  }
  return (
    <div className='panel Footer'>
      {
        renderButtons()
      }
        
    </div>
  );
}

export default Footer;
