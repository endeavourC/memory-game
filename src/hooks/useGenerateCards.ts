import { useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { gameDifficulty } from '../config/settings';
import { makeShuffleAlgorithm } from '../utils/makeShuffleAlgorithm';
import { numberValues } from '../config/pairValues';

export const useGenerateCards = () => {
	const { level } = useGameStore();

	const numberOfCards = useMemo(() => {
		return getNumberOfCards(level);
	}, [level]);

	const cards = useMemo(() => {
		return makeShuffleAlgorithm(numberOfCards, numberValues);
	}, [numberOfCards]);

	return { cards };
};

const getNumberOfCards = (level: number) => {
	const pairs = gameDifficulty[level as keyof typeof gameDifficulty];
	return pairs * 2;
};
