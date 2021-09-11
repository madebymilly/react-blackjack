import React, { Component } from 'react'
import Card from './Card'
import Move from './Move'
import '../styling/Hand.css'

class Hand extends Component {
  getHandValue = () => {
    let handValue = 0;
    this.props.hand.map(
      (card, i) =>
        handValue += card.value
    )
    return handValue;
  }
  getPossibleMoves = () => {
    let moves = [...this.props.moves];
    // if value of first two cards is the same:
    if ( this.props.hand[0].value === this.props.hand[1].value ) {
      moves.push('split');
    }
    // if value of first two cards together is 9, 10 or 11:
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
    const moves = (this.props.moves && this.props.roundActive)
      ? <div className="Hand-moves">
        {this.getPossibleMoves().map(move => 
          <Move key={move} move={move} handleMove={this.handleMove} />
        )}
      </div>
      : '';
    return (
      <div className="Hand">
        <div className="Hand-cards">
          {this.props.hand.map((card, i) => 
            <Card key={i} card={card} />
          )}
          <p className="Hand-total">Total: {this.getHandValue()}</p>
        </div>
        {moves}
      </div>
    )
  }
}

export default Hand
