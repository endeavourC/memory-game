import { Heading } from './Heading';
import { GameGrid } from './GameGrid';
import { Tile } from './Tile';
import { useGameLogic } from '../hooks/useGameLogic';
import { useGameStore } from '../store/gameStore';
import { useCallback } from 'react';

export const Game: React.FC = () => {
	const { tiles, onClick } = useGameLogic();
	const { isEnd, setInitialValues } = useGameStore((state) => state);

	const onGoBack = useCallback(() => {
		setInitialValues();
	}, [setInitialValues]);

	return (
		<div>
			<Heading onGoBack={onGoBack} />
			{isEnd && (
				<div className="flex items-center justify-center w-full h-full absolute top-0 left-0 bg-gray-900 bg-opacity-50">
					<div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-white rounded-lg">
						<p className="text-3xl">Koniec gry!</p>
						<p className="text-3xl">Gratulacje!</p>
						<button onClick={onGoBack}>Zacznij od nowa</button>
					</div>
				</div>
			)}
			<GameGrid>
				{tiles.map((tile) => {
					return (
						<Tile
							onClick={onClick}
							value={tile.value}
							id={tile.id}
							key={tile.uniqueId}
							isFound={tile.isFound}
							uniqueId={tile.uniqueId}
						/>
					);
				})}
			</GameGrid>
		</div>
	);
};
