import React, { Component } from 'react'

import { withRoundContext } from "../context/RoundContext";

import Card from './Card'
import Move from './Move'

import '../styling/Hand.css'

import { getTotalValue } from '../js/helpers'

class Hand extends Component {

  getPossibleMoves = () => {
    let moves = [...this.props.moves];
    // If value of first two cards is the same:
    if ( this.props.hand[0].value === this.props.hand[1].value ) {
      moves.push('split');
    }
    // If value of first two cards together is 9, 10 or 11:
    const totalValueFirstTwoCards = this.props.hand[0].value + this.props.hand[1].value
    if (  totalValueFirstTwoCards === 9 || totalValueFirstTwoCards === 10 || totalValueFirstTwoCards === 11 ) {
      moves.push('double');
    }
    return moves;
  }

  handleMove = (move) => {
    this.props.doMove(move, this.props.id);
  }

  render() {
    const { hand, bet, moves, done, result } = this.props;
    const { isRoundActive } = this.props.roundContext;
    const newMoves = (moves && isRoundActive)
      ? <div className="Hand-moves">
        {this.getPossibleMoves().map(move => 
          <Move key={move} move={move} handleMove={this.handleMove} />
        )}
      </div>
      : '';
    const winnings = () => {
      if (!isRoundActive && done) {
        switch(result) {
          case 'win':
            return 'WIN! 😄';
          case 'lose':
            return 'LOST 😓';
          case 'tie':
            return 'TIE! 😅';
          default:
            break;
        }
      }
    }
    return (
      <div className="Hand">
        <div className="Hand-bet">
          Bet: {bet}
        </div>
        <div className="Hand-cards">
          {hand.map((card, i) => 
            <Card key={i} card={card} />
          )}
          <p className="Hand-total">Total: {getTotalValue(hand)}</p>
          <p><strong>{winnings()}</strong></p>
        </div>
        {newMoves}
      </div>
    )
  }
}

export default withRoundContext(Hand);
