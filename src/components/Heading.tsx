import { useGameStore } from '../store/gameStore';

interface IProps {
	onGoBack: () => void;
}

export const Heading: React.FC<IProps> = ({ onGoBack }) => {
	const { moves } = useGameStore((state) => state);

	return (
		<div className="flex items-center justify-between w-full border-b-2 border-gray-200 mb-16 pb-4">
			<p className="text-3xl">Liczba ruchów: {moves}</p>
			<button onClick={onGoBack}>Wstecz</button>
		</div>
	);
};
