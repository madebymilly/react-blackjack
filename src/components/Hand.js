import React, { Component } from 'react'
import Card from './Card'
import Move from './Move'
import '../styling/Hand.css'

class Hand extends Component {
  getHandValue = (hand) => {
    let handValue = 0;
    hand.map(
      (card, i) =>
        handValue += card.value
    )
    return handValue;
  }
  render() {
    console.log(this.props.hand)
    return (
      <div className="Hand">
        <div className="Hand-cards">
          {this.props.hand.map((card, i) => 
            <Card key={i} card={card} />
          )}
          <p className="Hand-total">Total: {this.getHandValue(this.props.hand)}</p>
        </div>
        <div className="Hand-moves">
          {this.props.moves.map(move => 
            <Move key={move} move={move} doMove={this.props.doMove} />
          )}
        </div>
      </div>
    )
  }
}

export default Hand
