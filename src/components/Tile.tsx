import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion, useAnimate } from 'framer-motion';
import { PairItem } from '../types/model/PairItem';

interface IProps {
	value: number | string;
	id: number;
	uniqueId: string;
	isFound: boolean;
	onClick: ({ id, uniqueId, value }: PairItem) => void;
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

export const Tile: React.FC<IProps> = ({
	value,
	id,
	uniqueId,
	isFound,
	onClick,
}) => {
	const { selectedItems } = useGameStore((state) => state);
	const [scope, animate] = useAnimate();

	const isFlipped = selectedItems.some((item) => item.uniqueId === uniqueId);

	const handleOnClick = () => {
		if (isFlipped) return;

		onClick({ id, uniqueId, value, isFound });
	};

	useEffect(() => {
		if (isFound) {
			animate(scope.current, {
				scale: 0,
				transition: { duration: 0.3 },
			});
		}
	}, [isFound]);

	return (
		<motion.div ref={scope} style={{ perspective: '350px' }}>
			<motion.div
				style={{
					transformStyle: 'preserve-3d',
					cursor: isFound ? 'default' : 'pointer',
				}}
				variants={variants}
				animate={isFlipped ? 'selected' : 'notSelected'}
				onClick={handleOnClick}
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
		</motion.div>
	);
};
