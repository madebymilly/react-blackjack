import React, { Component } from 'react'
import Hand from './Hand'
import Bet from './Bet'
import '../styling/Player.css'

class Player extends Component {

  handleClick = () => {
    this.props.startRound();
  }

  render() {

    const { name, stacksize, hands, moves, bets, doBet, round, doMove } = this.props;

    return (
      <div className="Player">
        <h3>Player</h3>
        <div className="Player-info">
          <p className="Player-name">Name: {name}</p>
          <p className="Player-stacksize">Stacksize: {stacksize}</p>
        </div>
        <div className="Player-hands">
          {hands.map(hand =>
            <Hand key={hand.id} id={hand.id} hand={hand.cards} moves={moves} doMove={doMove} roundActive={round.active}/>
          )}
        </div>
        {!round.active &&
          <button className="Player-start-round" onClick={this.handleClick}>Start New Round</button>
        }
        {round.active && round.bet === 0 &&
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
