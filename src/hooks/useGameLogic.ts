import { gameDifficulty } from '../config/settings';
import { useGameStore } from '../store/gameStore';
import { makeShuffleAlgorithm } from '../utils/makeShuffleAlgorithm';
import { numberValues } from '../config/pairValues';
import { useCallback, useEffect, useMemo } from 'react';
import { PairItem } from '../types/model/PairItem';

export const useGameLogic = () => {
	const {
		level,
		tiles,
		blockUI,
		moves,
		setTiles,
		setMoves,
		selectedItems,
		setSelectedItems,
		setBlockUI,
	} = useGameStore((state) => state);

	const numberOfCards = useMemo(() => {
		return getNumberOfCards(level);
	}, [level]);

	const cards = useMemo(() => {
		return makeShuffleAlgorithm(numberOfCards, numberValues);
	}, [numberOfCards]);

	const onClick = (item: PairItem) => {
		if (!blockUI && selectedItems.length < 2) {
			updateSelectedItems(selectedItems, setSelectedItems, item);
			processWhenItemsMatch(
				selectedItems,
				setBlockUI,
				setSelectedItems,
				setTiles,
				tiles,
				item
			);

			setMoves(moves + 1);
		}
	};

	useEffect(() => {
		if (selectedItems.length === 2) {
			runAsyncCallback(setBlockUI, () => {
				setSelectedItems([]);
			});
		}
	}, [selectedItems, setBlockUI, setSelectedItems]);

	useEffect(() => {
		if (tiles.length === 0) {
			setTiles(cards);
		}
	}, [tiles, setTiles, cards]);

	return { tiles, onClick };
};

const getNumberOfCards = (level: number) => {
	const pairs = gameDifficulty[level as keyof typeof gameDifficulty];
	return pairs * 2;
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
	setBlockUI: (blockUI: boolean) => void,
	setSelectedItems: (selectedItems: Array<PairItem>) => void,
	setTiles: (tiles: Array<PairItem>) => void,
	tiles: Array<PairItem>,
	item: PairItem
) => {
	if (selectedItems[0]?.value === item.value) {
		runAsyncCallback(setBlockUI, () => {
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

const runAsyncCallback = <T extends () => void>(
	setBlockUI: (value: boolean) => void,
	callback: T,
	timeout = 1000
) => {
	setBlockUI(true);
	setTimeout(() => {
		callback();
		setBlockUI(false);
	}, timeout);
};
