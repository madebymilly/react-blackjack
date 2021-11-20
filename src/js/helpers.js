import React from 'react'
import { GiClubs, GiSpades, GiHearts, GiDiamonds } from 'react-icons/gi'

export const renderSuitIcon = (suit) => {
	switch (suit) {
		case 'hearts':
			return <GiHearts className="Card-icon Card-icon--red" />;

		case 'spades':
			return <GiSpades className="Card-icon" />;

		case 'clubs':
			return <GiClubs className="Card-icon" />;

		case 'diamonds':
			return <GiDiamonds className="Card-icon Card-icon--red" />;

		default:
			return '';
	}
};

export const getTotalValue = (cards) => {
	let handValue = 0;
	cards.map(
		(card, i) =>
			handValue += card.value
	)
	return handValue;
}

export function storeToLocalStorage( key, value ) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage( key ) {
	return JSON.parse(window.localStorage.getItem(key))
}
