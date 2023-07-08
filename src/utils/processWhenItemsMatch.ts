import { PairItem } from '../types/model/PairItem';

export const processWhenItemsMatch = (
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
