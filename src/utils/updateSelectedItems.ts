import { PairItem } from '../types/model/PairItem';

export const updateSelectedItems = (
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
