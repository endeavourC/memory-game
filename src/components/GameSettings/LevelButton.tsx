import { PropsWithChildren } from 'react';

interface IProps {
	onClick: () => void;
}

export const LevelButton: React.FC<PropsWithChildren<IProps>> = ({
	children,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className="p-4 text-center border-2 border-gray-200 my-4 cursor-pointer rounded-2xl text-xl uppercase hover:bg-gray-200"
		>
			{children}
		</button>
	);
};
