import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

export const Counter = () => {
	const { moves, setInitialValues } = useGameStore((state) => state);

	const onGoBack = useCallback(() => {
		setInitialValues();
	}, [setInitialValues]);

	return (
		<div className="flex items-center justify-between w-full border-b-2 border-gray-200 mb-16 pb-4">
			<p className="text-3xl">Liczba ruchów: {moves}</p>
			<button onClick={onGoBack}>Wstecz</button>
		</div>
	);
};
