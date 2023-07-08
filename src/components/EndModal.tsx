interface IProps {
	onClose: () => void;
}

export const EndModal: React.FC<IProps> = ({ onClose }) => {
	return (
		<div className="flex items-center justify-center w-full h-full absolute top-0 left-0 bg-gray-900 bg-opacity-50">
			<div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-white rounded-lg">
				<p className="text-3xl">Koniec gry!</p>
				<p className="text-3xl">Gratulacje!</p>
				<button onClick={onClose}>Zacznij od nowa</button>
			</div>
		</div>
	);
};
