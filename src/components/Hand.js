import React, { Component } from 'react'
import Card from './Card'

class Hand extends Component {
  render() {
    return (
      <div className="Hand">
        <div className="Hand-cards">
          <Card />
          <Card />
        </div>
      </div>
    )
  }
}

export default Hand
