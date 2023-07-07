import { GameLevels } from '../types/enums/GameLevels';

export const getGameLevelLabel = (level: GameLevels): string => {
	switch (level) {
		case GameLevels.EASY:
			return 'Łatwy';
		case GameLevels.MEDIUM:
			return 'Sredni';
		case GameLevels.HARD:
			return 'Trudny';
		default:
			return 'Nieustawiony';
	}
};
