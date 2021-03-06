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
    this.checkWinnings = this.checkWinnings.bind(this)
    this.checkEndRound = this.checkEndRound.bind(this)
    this.endRound = this.endRound.bind(this)
    this.startRound = this.startRound.bind(this)
    this.doBet = this.doBet.bind(this)
    
  }

  resetGame() {
    window.localStorage.clear()
    this.props.playerContext.setPlayerInfo( '', '' );
    this.props.playerContext.setHands([]);
    this.props.roundContext.restart();
    this.setState({
      gameHasStarted: false,
    })
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

    // If hand value > 21 set hand to done & lose:
    if ( getTotalValue(tempHands.find(hand => hand.id === id).cards) > 21) {
      tempHands = playerHands.map(function(hand) {
        if (hand.id === id) {
          return { ...hand, cards: [...hand.cards, newCard], done: true, result: 'lose' }
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
    const { playerHands, setHands, updateStack } = this.props.playerContext;
    const tempHands = playerHands;
    const currentBet = playerHands[id].bet;
    const secondCard = playerHands[id].cards[1];
    console.log(secondCard);
    // create a new hand for the player.
    // move second card from this hand to next hand.
    const newHand = { id: id+1, cards: [secondCard, this.dealCard()], done: false, bet: currentBet, result: null };
    tempHands[id].cards.splice(1);
    tempHands[id].cards.push(this.dealCard());
    tempHands.push(newHand);

    // update stack:
    updateStack(currentBet);
    
    setHands( tempHands );

    
  }

  doMoveDouble(id) {
    const newCard = this.dealCard();
    const { playerHands } = this.props.playerContext;

    // Map through all hands, if hand has the right id, than return hand + new card:
    // also set hand to done (only one card can be added when double)
    let tempHands = playerHands.map(function(hand) {
      if (hand.id === id) {
        return { ...hand, cards: [...hand.cards, newCard], done: true, bet: hand.bet * 2 }
      } else {
        return hand;
      }
    });

    this.props.playerContext.setHands(tempHands, this.checkEndRound);
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

  checkWinnings() {
    const { playerHands, setHands, updateStack } = this.props.playerContext;
    const tempHands = playerHands;

    const totalBank = getTotalValue(this.state.bank.hand);

    let amount = 0;

    // loop trough all hands:
    tempHands.forEach(hand => {
      const totalHand = getTotalValue(hand.cards);
      const winAmount = hand.bet * 2;
      const tieAmount = hand.bet;
      if ( hand.result === null && hand.done ) {
        if ( totalBank > 21 ) {
          hand.result = 'win';
          hand.winnings = amount = winAmount;
        } else if ( totalBank === totalHand ) {
          hand.result = 'tie';
          hand.winnings = amount = tieAmount;
        } else if ( totalBank < totalHand ) {
          hand.result = 'win';
          hand.winnings = amount = winAmount;

        } else {
          hand.result = 'lose';
        }
      };
      updateStack(-amount);
    });
    setHands(tempHands);   
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
    }), () => {
      this.checkWinnings();
    })
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
    this.dealFirstCards(bet);
  }

  dealFirstCards(bet) {
    //const dealtCardsToPlayer = [this.dealCard(), this.dealCard()];
    const dealtCardsToPlayer = [{rank: 5, suit: 'clubs', value: 5}, {rank: 5, suit: 'hearts', value: 5}];
    const dealtCardToBank = [this.dealCard()];
    this.props.playerContext.setHands([{ id: 0, cards: dealtCardsToPlayer, done: false, bet: bet, result: null }]);
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
