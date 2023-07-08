import { PairItem } from '../types/model/PairItem';

export const checkIfGameIsEnded = (
	tiles: Array<PairItem>,
	setIsEnd: (val: boolean) => void
) => {
	if (tiles.length && tiles.every((tile) => tile.isFound)) {
		setIsEnd(true);
	}
};
