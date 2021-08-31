import React from 'react'
import '../styling/Card.css'
import { renderSuitIcon } from '../js/helpers.js'

function Card(props) {
  console.log(props.card)
  return (
    <div className="Card">
      {/* {`${props.card.rank} of ${props.card.suit} (value: ${props.card.value})`} */}
      {props.card.rank} of {renderSuitIcon(props.card.suit)} (value: {props.card.value})
    </div>
  )
}

export default Card
