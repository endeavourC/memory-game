import { useRunAsyncCallback } from './useRunAsyncCallback';
import { useGameStore } from '../store/gameStore';
import { useEffect } from 'react';
import { PairItem } from '../types/model/PairItem';
import { useGenerateCards } from './useGenerateCards';
import { processWhenItemsMatch } from '../utils/processWhenItemsMatch';
import { updateSelectedItems } from '../utils/updateSelectedItems';
import { clearWhenItemsNotMatch } from '../utils/clearWhenItemsNotMatch';
import { checkIfGameIsEnded } from '../utils/checkIfGameIsEnded';

export const useGameLogic = () => {
	const {
		tiles,
		blockUI,
		moves,
		setTiles,
		setMoves,
		selectedItems,
		setSelectedItems,
		setIsEnd,
	} = useGameStore((state) => state);

	const { runAsyncCallback } = useRunAsyncCallback();
	const { cards } = useGenerateCards();

	useEffect(() => {
		clearWhenItemsNotMatch(selectedItems, runAsyncCallback, setSelectedItems);
	}, [selectedItems]);

	useEffect(() => {
		if (tiles.length === 0) {
			setTiles(cards);
		}

		checkIfGameIsEnded(tiles, setIsEnd);
	}, [tiles, setTiles, cards, setIsEnd]);

	const onClick = (item: PairItem) => {
		if (blockUI || selectedItems.length > 2 || item.isFound) return;
		setMoves(moves + 1);

		updateSelectedItems(selectedItems, setSelectedItems, item);

		processWhenItemsMatch(
			selectedItems,
			runAsyncCallback,
			setSelectedItems,
			setTiles,
			tiles,
			item
		);
	};
	return { tiles, onClick };
};
