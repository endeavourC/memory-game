interface IProps {
	children: React.ReactNode;
}

export const Container: React.FC<IProps> = ({ children }) => {
	return (
		<div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
			{children}
		</div>
	);
};
