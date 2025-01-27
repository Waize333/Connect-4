import React from 'react'
import { GAME_STATE_PLAYING,GAME_STATE_WIN ,GAME_STATE_DRAW} from '../Constants'

const Header = ({gameState,currentPlayer,winPlayer}) => {
    const renderLabel=()=>{
        switch(gameState){
            case GAME_STATE_PLAYING:
            return <div>Player {currentPlayer} Turn</div>
            case GAME_STATE_WIN:
            return <div>Player {winPlayer} Wins</div>
            case GAME_STATE_DRAW:
            return <div>DRAW GAME</div>
        }
    }
  return (
    <div className='panel Header'>
        <div className='header-text'>{renderLabel()}</div>
    </div>
  )
}

export default Header