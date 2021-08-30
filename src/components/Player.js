import React, { Component } from 'react'
import Hand from './Hand'
import Move from './Move'
import Bet from './Bet'

class Player extends Component {

  render() {

    const { name, stacksize, hands, moves, bets, doMove, doBet } = this.props;

    return (
      <div className="Player">
        <h3>Player</h3>
        <div className="Player-hands">
          <Hand hand={hands} />
        </div>
        <div className="Player-moves">
          {moves.map(move => 
            <Move key={move} move={move} doMove={doMove} />
          )}
        </div>
        <div className="Player-info">
          <p className="Player-name">Name: {name}</p>
          <p className="Player-stacksize">Stacksize: {stacksize}</p>
        </div>
        <div className="Player-bets">
        {bets.map(bet => 
            <Bet key={bet} bet={bet} doBet={doBet} />
          )}
        </div>
      </div>
    )
  }
}

export default Player
