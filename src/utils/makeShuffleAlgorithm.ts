import { shuffle } from 'lodash';
import { PairItem } from '../types/model/PairItem';
import { v4 as uuidv4 } from 'uuid';

export const makeShuffleAlgorithm = (
	numberOfCards: number,
	pairValues: Array<PairItem>
): Array<PairItem> => {
	const cards: PairItem[] = [];
	const numberOfPairs = numberOfCards / 2;

	for (let i = 0; i < numberOfPairs; i++) {
		const randomize = Math.floor(Math.random() * pairValues.length);
		const pair = pairValues[randomize];

		if (!cards.some((card) => card.value === pair.value)) {
			cards.push({ ...pair, uniqueId: uuidv4(), isFound: false });
			cards.push({ ...pair, uniqueId: uuidv4(), isFound: false });
		} else {
			i--;
		}
	}

	return shuffle(cards);
};
