import { create } from 'zustand';
import { PairItem } from '../types/model/PairItem';

type IGameStoreProperties = {
	moves: number;
	score: number;
	tiles: Array<PairItem>;
	selectedItems: Array<PairItem>;
	isEnd: boolean;
	level: number;
	blockUI: boolean;
};

type IGameStoreActions = {
	setLevel: (level: number) => void;
	setMoves: (moves: number) => void;
	setScore: (score: number) => void;
	setTiles: (tiles: Array<PairItem>) => void;
	setSelectedItems: (selectedItems: Array<PairItem>) => void;
	setIsEnd: (isEnd: boolean) => void;
	setInitialValues: () => void;
	setBlockUI: (blockUI: boolean) => void;
};

export const initialGameStore: IGameStoreProperties = {
	moves: 0,
	score: 0,
	selectedItems: [],
	tiles: [],
	isEnd: false,
	level: 0,
	blockUI: false,
};

export const useGameStore = create<IGameStoreProperties & IGameStoreActions>(
	(set) => ({
		...initialGameStore,
		setLevel: (level: number) => set({ level }),
		setMoves: (moves: number) => set({ moves }),
		setScore: (score: number) => set({ score }),
		setTiles: (tiles: Array<PairItem>) => set({ tiles }),
		setIsEnd: (isEnd: boolean) => set({ isEnd }),
		setSelectedItems: (selectedItems: Array<PairItem>) =>
			set({ selectedItems }),
		setInitialValues: () => set({ ...initialGameStore }),
		setBlockUI: (blockUI: boolean) => set({ blockUI }),
	})
);
