import React from 'react'

function Card(props) {
  console.log(props.card)
  return (
    <div className="Card">
      {`${props.card.rank} of ${props.card.suit} (value: ${props.card.value})` }
    </div>
  )
}

export default Card
