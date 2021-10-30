import React from 'react'
import { GiClubs, GiSpades, GiHearts, GiDiamonds } from 'react-icons/gi'

const renderSuitIcon = (suit) => {
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

const getTotalValue = (cards) => {
	let handValue = 0;
	cards.map(
		(card, i) =>
			handValue += card.value
	)
	return handValue;
}

export { renderSuitIcon, getTotalValue }
