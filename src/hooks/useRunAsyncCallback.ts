import { useGameStore } from '../store/gameStore';

export const useRunAsyncCallback = () => {
	const { setBlockUI } = useGameStore((state) => state);

	const runAsyncCallback = <T extends () => void>(
		callback: T,
		timeout = 1000
	) => {
		setBlockUI(true);
		setTimeout(() => {
			callback();
			setBlockUI(false);
		}, timeout);
	};

	return { runAsyncCallback };
};
