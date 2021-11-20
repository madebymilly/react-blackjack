import React, { Component } from 'react'

import { withRoundContext } from "../context/RoundContext";
import { withPlayerContext } from '../context/PlayerContext'

import Round from './Round'
import Bank from './Bank'
import Player from './Player'
import StartGameForm from './StartGameForm'

import fullDeck from '../data/deck'

import '../styling/Board.css'

import { getTotalValue } from '../js/helpers'


const DECK = fullDeck.sort(() => 0.5 - Math.random());

class Board extends Component {

  static defaultProps = {
    bets: [10, 25, 50, 100, 200],
    moves: ['hit', 'pass']
  }

  constructor(props) {
    super(props)

    this.state = {
      deck: DECK,
      gameHasStarted: false, // for testing purpose set to true (should be false)
      bank: { hand: [] }
    }

    this.resetGame = this.resetGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.dealCard = this.dealCard.bind(this)
    this.doMove = this.doMove.bind(this)
    this.doMoveHit = this.doMoveHit.bind(this)
    this.doMovePass = this.doMovePass.bind(this)
    this.doMoveSplit = this.doMoveSplit.bind(this)
    this.doMoveDouble = this.doMoveDouble.bind(this)
    this.getBankCardsTill17 = this.getBankCardsTill17.bind(this)
    this.checkEndRound = this.checkEndRound.bind(this)
    this.endRound = this.endRound.bind(this)
    this.startRound = this.startRound.bind(this)
    this.doBet = this.doBet.bind(this)
    
  }

  resetGame() {
    console.log('reset game')
  }

  startGame( playerName, playerStack ) {
    this.props.playerContext.setPlayerInfo( playerName, playerStack );
    this.setState({
      gameHasStarted: true,
    })
  }

  dealCard() {
    const tempDeck = this.state.deck;
    const randomIndex = Math.floor(Math.random() * tempDeck.length);
    const card = tempDeck[randomIndex];
    tempDeck.splice(randomIndex, 1);
    this.setState({ 
      deck: tempDeck 
    });
    return card;
  }

  doMove(move, id) {
    switch(move) {
      case 'hit':
        this.doMoveHit(id);
        break;
      case 'pass':
        this.doMovePass(id);
        break;
      case 'split':
        this.doMoveSplit(id);
        break;
      case 'double':
        this.doMoveDouble(id);
        break;
      default:
        break;
    }
  }

  doMoveHit(id) {
    const newCard = this.dealCard();
    const playerHands = this.props.playerContext.playerHands;

    // Map through all hands, if hand has the right id, than return hand + new card:
    let tempHands = playerHands.map(function(hand) {
      if (hand.id === id) {
        return { ...hand, cards: [...hand.cards, newCard] }
      } else {
        return hand;
      }
    });

    // If hand value > 21 set hand to done:
    if ( getTotalValue(tempHands.find(hand => hand.id === id).cards) > 21) {
      tempHands = playerHands.map(function(hand) {
        if (hand.id === id) {
          return { ...hand, cards: [...hand.cards, newCard], done: true }
        } else {
          return hand;
        }
      });
    }

    this.props.playerContext.setHands(tempHands, this.checkEndRound);
  }

  doMovePass(id) {
    // Map through all hands, if hand has the right id, than set hand to done:
    const tempHands = this.props.playerContext.playerHands.map(hand =>
      hand.id === id
        ? { ...hand, done: true }
        : hand
    );

    this.props.playerContext.setHands(tempHands, this.checkEndRound);
  }

  doMoveSplit(id) {
    console.log('do move split')
  }

  doMoveDouble(id) {
    console.log('do move double')
  }

  getBankCardsTill17() {
    let newCards = [];
    let currentBankHandValue = this.state.bank.hand[0].value;
    while (currentBankHandValue < 17) {
      const newCard = this.dealCard();
      newCards = [...newCards, newCard];
      currentBankHandValue += newCard.value;
    }
    return newCards;
  }

  checkEndRound() {
    let allHandsDone = this.props.playerContext.playerHands.every( hand => hand.done === true );
    if (allHandsDone) {
      this.endRound();
    } 
  }

  endRound() {
    this.props.roundContext.deActivateRound();
    const newCardsForBank = this.getBankCardsTill17();
    this.setState(prevState => ({
      bank: { ...prevState.bank, hand: [...prevState.bank.hand, ...newCardsForBank] }
    }))
  }

  startRound() {
    this.props.roundContext.activateRound();
    this.props.playerContext.setHands([]);
    this.setState(prevState => ({
      bank: { ...prevState.bank, hand: [] },    
    }))
  }

  doBet(bet) {
    this.props.roundContext.setBet(bet);
    this.props.playerContext.updateStack(bet);
    this.dealFirstCards();
  }

  dealFirstCards() {
    const dealtCardsToPlayer = [this.dealCard(), this.dealCard()];
    const dealtCardToBank = [this.dealCard()];
    this.props.playerContext.setHands([{ id: 0, cards: dealtCardsToPlayer, done: false }]);
    this.setState(prevState => ({
      bank: { ...prevState.bank, hand: dealtCardToBank }
    }))
  }

  render() {

    const { moves, bets } = this.props;
    const { bank } = this.state;
    const { playerName, playerStack } = this.props.playerContext;

    return (
      <div className="Board">
        <h1>Black Jack!</h1>
        {playerName && playerStack !== 0
        ? <div>
            <Round resetGame={this.resetGame} />
            <Bank hand={bank.hand} />
            <div className="Board-players">
              <Player
                moves={moves}
                bets={bets}
                doBet={this.doBet}
                doMove={this.doMove}
                startRound={this.startRound}
              />
            </div>
          </div>
          : <StartGameForm startGame={this.startGame} />
        }
      </div>
    )
  }
}

export default withRoundContext(withPlayerContext(Board));
