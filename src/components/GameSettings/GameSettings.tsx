import { useGameStore } from '../../store/gameStore';
import { GameLevels } from '../../types/enums/GameLevels';
import { LevelButton } from './LevelButton';

export const GameSettings = () => {
	const { setLevel } = useGameStore((state) => state);

	return (
		<div className="flex flex-col">
			<p className="text-2xl">Wybierz poziom trudności:</p>
			<LevelButton onClick={() => setLevel(GameLevels.EASY)}>Łatwy</LevelButton>
			<LevelButton onClick={() => setLevel(GameLevels.MEDIUM)}>
				Średni
			</LevelButton>
			<LevelButton onClick={() => setLevel(GameLevels.HARD)}>
				Trudny
			</LevelButton>
		</div>
	);
};
