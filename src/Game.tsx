import { useEffect } from 'react';
import { Counter } from './components/Counter';
import { GameGrid } from './components/GameGrid';
import { Tile } from './components/Tile';
import { useGameLogic } from './hooks/useGameLogic';
import { useGameStore } from './store/gameStore';

export const Game = () => {
	const { selectedItems, setSelectedItems, setBlockUI, tiles } = useGameStore(
		(state) => state
	);

	useGameLogic();

	useEffect(() => {
		if (selectedItems.length === 2) {
			setBlockUI(true);
			setTimeout(() => {
				setSelectedItems([]);
				setBlockUI(false);
			}, 1000);
		}
	}, [selectedItems, setBlockUI, setSelectedItems]);

	console.log(tiles);

	return (
		<div>
			<Counter />
			<GameGrid>
				{tiles.map((tile) => {
					return (
						<Tile
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
