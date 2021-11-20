import React, { Component, createContext } from "react";
import { storeToLocalStorage, getLocalStorage } from '../js/helpers'

export const RoundContext = createContext();

export class RoundProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      roundNum: getLocalStorage('roundNum') || 0, 
      roundBet: 0, 
      isRoundActive: false 
    }
  }

  activateRound = () => {
    this.setState(prevState => ({
      isRoundActive: true,
      roundNum: prevState.roundNum + 1
    }), () =>
      storeToLocalStorage( 'roundNum', this.state.roundNum)
    )
  }

  deActivateRound = () => {
    this.setState({
      isRoundActive: false,
      roundBet: 0
    })
  }

  setBet = (bet) => {
    this.setState({
      roundBet: bet
    })
  }

  render() {
    return (
      <RoundContext.Provider value={{ 
        ...this.state, 
        activateRound: this.activateRound,
        deActivateRound: this.deActivateRound,
        setBet: this.setBet
      }}>
        {this.props.children}
      </RoundContext.Provider>
    )
  }
  
}

// Higher Order Component:
export const withRoundContext = Component => props => (
  <RoundContext.Consumer>
    {value => <Component roundContext={value} {...props} />}
  </RoundContext.Consumer> 
)

