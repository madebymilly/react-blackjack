import React, { Component, createContext } from "react";
import { storeToLocalStorage, getLocalStorage } from "../js/helpers";

export const PlayerContext = createContext();

export class PlayerProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      playerId: 1,
      playerName: getLocalStorage('playerName') || '',
      playerStack: getLocalStorage('playerStack') || 0,
      playerHands: []
      // playerHands: [
      //   { id: 0, cards: [DECK[2], DECK[3]], done: false, winner: false, bet: 100 },
      //   { id: 1, cards: [DECK[4], DECK[5]], done: false, winner: false, bet: 100 },
      //   { id: 2, cards: [DECK[6], DECK[7]], done: false, winner: false, bet: 100 }
      // ]
    }
  }

  setPlayerInfo = (name, stack) => {
    this.setState({
      playerStack: stack,
      playerName: name
    }, () => {
      storeToLocalStorage( 'playerName', name );
      storeToLocalStorage( 'playerStack', stack );
    })
  }

  updateStack = (bet) => {
    this.setState(prevState => ({
      playerStack: prevState.playerStack - bet
    }), () => {
      storeToLocalStorage( 'playerStack', this.state.playerStack )
    })
  }

  setHands = (hands, checkEndRound) => {
    this.setState({
      playerHands: hands
    }, () =>
      checkEndRound && checkEndRound()
    );
  }

  render() {
    return (
      <PlayerContext.Provider value={{ 
        ...this.state, 
        setPlayerInfo: this.setPlayerInfo,
        updateStack: this.updateStack,
        setHands: this.setHands
      }}>
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
  
}

// Higher Order Component:
export const withPlayerContext = Component => props => (
  <PlayerContext.Consumer>
    {value => <Component playerContext={value} {...props} />}
  </PlayerContext.Consumer> 
)

