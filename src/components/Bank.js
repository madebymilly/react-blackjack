import React from 'react'
import Card from './Card'

function Bank(props) {
  return (
    <div className="Bank">
      <h3>Bank</h3>
      <div className="Bank-hand">
        <div className="Bank-cards">
          {props.hand.map((card, i) => 
            <Card key={i} card={card} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Bank
