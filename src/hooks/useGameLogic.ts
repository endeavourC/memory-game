import { useRunAsyncCallback } from './useRunAsyncCallback';
import { useGameStore } from '../store/gameStore';
import { useEffect } from 'react';
import { PairItem } from '../types/model/PairItem';
import { useGenerateCards } from './useGenerateCards';

export const useGameLogic = () => {
	const {
		tiles,
		blockUI,
		moves,
		setTiles,
		setMoves,
		selectedItems,
		setSelectedItems,
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
	}, [tiles, setTiles, cards]);

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

const updateSelectedItems = (
	selectedItems: PairItem[],
	setSelectedItems: (selectedItems: Array<PairItem>) => void,
	item: PairItem
) => {
	const updatedSelectedItems = [
		...selectedItems,
		{
			...item,
			isFound: false,
		},
	];

	setSelectedItems(updatedSelectedItems);
};

const processWhenItemsMatch = (
	selectedItems: PairItem[],
	runAsyncCallback: (callback: () => void, timeout?: number) => void,
	setSelectedItems: (selectedItems: Array<PairItem>) => void,
	setTiles: (tiles: Array<PairItem>) => void,
	tiles: Array<PairItem>,
	item: PairItem
) => {
	if (selectedItems[0]?.value === item.value) {
		runAsyncCallback(() => {
			setSelectedItems([]);
			setTiles([
				...tiles.map((tile) => {
					if (tile.id === item.id) {
						return {
							...tile,
							isFound: true,
						};
					}
					return tile;
				}),
			]);
		});
	}
};

const clearWhenItemsNotMatch = (
	selectedItems: Array<PairItem>,
	runAsyncCallback: (callback: () => void, timeout?: number) => void,
	setSelectedItems: (selectedItems: Array<PairItem>) => void
) => {
	if (
		selectedItems[0]?.value !== selectedItems[1]?.value &&
		selectedItems.length === 2
	) {
		runAsyncCallback(() => {
			setSelectedItems([]);
		});
	}
};
