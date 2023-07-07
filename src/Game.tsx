import { Counter } from './components/Counter';
import { GameGrid } from './components/GameGrid';
import { Tile } from './components/Tile';
import { useGameLogic } from './hooks/useGameLogic';

export const Game = () => {
	const { tiles, onClick } = useGameLogic();

	return (
		<div>
			<Counter />
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
