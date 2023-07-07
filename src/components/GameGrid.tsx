interface IProps {
	children: React.ReactNode;
}

export const GameGrid: React.FC<IProps> = ({ children }) => {
	return <div className="grid grid-cols-6 gap-4">{children}</div>;
};
