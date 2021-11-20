import React, { Component } from 'react'

import { RoundContext } from "../context/RoundContext";

import Hand from './Hand'
import Bet from './Bet'

import '../styling/Player.css'

class Player extends Component {

  static contextType = RoundContext;

  handleClick = () => {
    this.props.startRound();
  }

  render() {

    const { name, stacksize, hands, moves, bets, doBet, doMove } = this.props;
    const { roundBet, isRoundActive } = this.context;

    return (
      <div className="Player">
        <h3>Player</h3>
        <div className="Player-info">
          <p className="Player-name">Name: {name}</p>
          <p className="Player-stacksize">Stacksize: {stacksize}</p>
        </div>
        <div className="Player-hands">
          {hands.map(hand =>
            <Hand key={hand.id} id={hand.id} hand={hand.cards} moves={moves} doMove={doMove} />
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

export default Player
