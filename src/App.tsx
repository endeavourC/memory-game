import { Game } from './Game';
import { Container } from './components/Container';
import { GameSettings } from './components/GameSettings/GameSettings';
import { useGameStore } from './store/gameStore';
import { GameLevels } from './types/enums/GameLevels';

function App() {
	const { level, isEnd } = useGameStore((state) => state);

	return (
		<Container>
			{level === GameLevels.NOT_PICKED ? (
				<GameSettings />
			) : (
				<Game isEnd={isEnd} />
			)}
		</Container>
	);
}

export default App;
