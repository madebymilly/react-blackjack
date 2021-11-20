import React, { Component, createContext } from "react";

export const RoundContext = createContext();

export class RoundProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      roundNum: 0, 
      roundBet: 0, 
      isRoundActive: false 
    }
  }

  activateRound = () => {
    this.setState(prevState => ({
      isRoundActive: true,
      roundNum: prevState.roundNum + 1
    }))
  }

  deActivateRound = () => {
    this.setState(prevState => ({
      isRoundActive: false,
      roundBet: 0
    }))
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

