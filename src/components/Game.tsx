import { Heading } from './Heading';
import { GameGrid } from './GameGrid';
import { Tile } from './Tile';
import { useGameLogic } from '../hooks/useGameLogic';
import { useGameStore } from '../store/gameStore';
import { useCallback } from 'react';
import { EndModal } from './EndModal';

export const Game: React.FC = () => {
	const { tiles, onClick } = useGameLogic();
	const { isEnd, setInitialValues } = useGameStore((state) => state);

	const onGoBack = useCallback(() => {
		setInitialValues();
	}, [setInitialValues]);

	return (
		<div>
			<Heading onGoBack={onGoBack} />
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
			{isEnd ? <EndModal onClose={onGoBack} /> : null}
		</div>
	);
};
