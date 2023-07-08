import { PairItem } from '../types/model/PairItem';

export const clearWhenItemsNotMatch = (
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
