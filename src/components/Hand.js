import React, { Component } from 'react'
import Card from './Card'
import Move from './Move'

class Hand extends Component {
  render() {
    console.log(this.props.hand)
    return (
      <div className="Hand">
        <div className="Hand-cards">
          {this.props.hand.map((card, i) => 
            <Card key={i} card={card} />
          )}
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
