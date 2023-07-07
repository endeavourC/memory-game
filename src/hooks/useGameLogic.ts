import { gameDifficulty } from '../config/settings';
import { useGameStore } from '../store/gameStore';
import { makeShuffleAlgorithm } from '../utils/makeShuffleAlgorithm';
import { numberValues } from '../config/pairValues';
import { useEffect, useMemo } from 'react';

export const useGameLogic = () => {
	const { level, tiles, setTiles } = useGameStore((state) => state);

	const numberOfCards = getNumberOfCards(level);

	const cards = useMemo(() => {
		return makeShuffleAlgorithm(numberOfCards, numberValues);
	}, [numberOfCards]);

	useEffect(() => {
		if (tiles.length === 0) {
			setTiles(cards);
		}
	}, [tiles, setTiles, cards]);

	return { cards };
};

const getNumberOfCards = (level: number) => {
	const pairs = gameDifficulty[level as keyof typeof gameDifficulty];
	return pairs * 2;
};
