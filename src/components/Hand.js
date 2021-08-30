import React, { Component } from 'react'
import Card from './Card'

class Hand extends Component {
  render() {
    console.log(this.props.hand)
    return (
      <div className="Hand">
        <div className="Hand-cards">
          {this.props.hand.map(card => 
            <Card card={card} />
          )}
        </div>
      </div>
    )
  }
}

export default Hand
