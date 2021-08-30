import React from 'react'
import Hand from './Hand'

function Bank(props) {
  return (
    <div className="Bank">
      <h3>Bank</h3>
      <div className="Bank-hand">
        <Hand hand={props.hand}/>
      </div>
    </div>
  )
}

export default Bank
