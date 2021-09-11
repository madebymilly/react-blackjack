import React from 'react'
import '../styling/Card.css'
import { renderSuitIcon } from '../js/helpers.js'

function Card(props) {
  return (
    <div className="Card">
      {props.card.rank} of {renderSuitIcon(props.card.suit)} (value: {props.card.value})
    </div>
  )
}

export default Card
