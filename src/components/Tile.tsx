import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

interface IProps {
	value: number | string;
	id: number;
	uniqueId: string;
	isFound: boolean;
}

const variants = {
	selected: {
		rotateY: 180,
		scale: 1.03,
		transition: { duration: 0.3 },
	},
	notSelected: {
		rotateY: 0,
		scale: 1,
		transition: { duration: 0.3 },
	},
};

export const Tile: React.FC<IProps> = ({ value, id, uniqueId, isFound }) => {
	const {
		setMoves,
		moves,
		selectedItems,
		setSelectedItems,
		setBlockUI,
		setTiles,
		tiles,
		blockUI,
	} = useGameStore((state) => state);

	const isFlipped = selectedItems.some((item) => item.uniqueId === uniqueId);

	const onClick = () => {
		if (isFound) return;
		if (blockUI) return;
		if (isFlipped) return;
		if (selectedItems.length < 2) {
			setSelectedItems([
				...selectedItems,
				{
					id,
					uniqueId,
					value,
					isFound: false,
				},
			]);

			if (selectedItems[0]?.value === value) {
				setBlockUI(true);
				setTimeout(() => {
					setSelectedItems([]);
					setTiles([
						...tiles.map((tile) => {
							if (tile.id === id) {
								return {
									...tile,
									isFound: true,
								};
							}
							return tile;
						}),
					]);
					setBlockUI(false);
				}, 1000);
			}

			setMoves(moves + 1);
		}
	};

	return (
		<div
			style={{ perspective: '350px', opacity: isFound ? 0 : 1 }}
			onClick={onClick}
		>
			<motion.div
				style={{
					transformStyle: 'preserve-3d',
					cursor: isFound ? 'default' : 'pointer',
				}}
				variants={variants}
				animate={isFlipped ? 'selected' : 'notSelected'}
				onClick={onClick}
				className="relative w-20 h-20 bg-white border-gray-300 cursor-pointer border-2 hover:bg-gray-300 flex items-center justify-center"
			>
				{!isFlipped ? (
					<div style={{ backfaceVisibility: 'hidden' }}></div>
				) : (
					<div
						style={{
							transform: 'rotateY(180deg)',
							backfaceVisibility: 'hidden',
						}}
					>
						{value}
					</div>
				)}
			</motion.div>
		</div>
	);
};
