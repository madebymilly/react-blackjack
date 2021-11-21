import React, { Component } from 'react'

import { withRoundContext } from "../context/RoundContext";
import { withPlayerContext } from '../context/PlayerContext'

import Hand from './Hand'
import Bet from './Bet'

import '../styling/Player.css'

class Player extends Component {

  handleClick = () => {
    this.props.startRound();
  }

  render() {

    const { moves, bets, doBet, doMove } = this.props;
    const { roundBet, isRoundActive } = this.props.roundContext;
    const { playerName, playerStack, playerHands } = this.props.playerContext;

    return (
      <div className="Player">
        <h3>Player</h3>
        <div className="Player-info">
          <p className="Player-name">Name: {playerName}</p>
          <p className="Player-stacksize">Stacksize: {playerStack}</p>
        </div>
        <div className="Player-hands">
          {playerHands.map(hand =>
            <Hand 
              key={hand.id} 
              id={hand.id} 
              hand={hand.cards} 
              bet={hand.bet} 
              result={hand.result} 
              done={hand.done} 
              winnings={hand.winnings} 
              moves={moves} 
              doMove={doMove} 
            />
          )}
        </div>
        {!isRoundActive &&
          <button className="Player-start-round" onClick={this.handleClick}>Start New Round</button>
        }
        {isRoundActive && roundBet === 0 &&
          <div className="Player-bets">
            {bets.map(bet => 
              <Bet key={bet} bet={bet} doBet={doBet} />
            )}
          </div>
        }
      </div>
    )
  }
}

export default withRoundContext(withPlayerContext(Player));
