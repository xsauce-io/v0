import toast from 'react-hot-toast';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';

export const ToastNotificationActionBar = ({
	subMessage,
	icon,
	message,
	t,
	onClick,
}) => {
	const { width, height } = useWindowDimensions();
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};
	if (width <= screens.tablet) {
		return (
			<div
				className={`bg-[#0C1615] p-4  shadow-md rounded-xl w-full mt-[30px] ${
					t.visible ? 'animate-enter' : 'animate-leave'
				}`}
			>
				<div className="flex flex-col items-start space-y-1">
					<div className="flex flex-row w-full">
						{icon}
						<div className="flex-1"></div>
						<button
							className="text-white text-sm flex-2"
							onClick={() => toast.remove(t.id)}
						>
							<img src="/xClose.svg" />
						</button>
					</div>
					<div className="flex flex-col space-y-1">
						<text className="text-white text-sm">{message} </text>
						<text className="text-[#748282] text-xs ">{subMessage}</text>
						<div className="text-[#748282] text-xs border-t-[1px] border-[#30403F] space-x-4 pt-2 flex">
							<text className="text-[#748282]">Learn more</text>
							<button
								className="text-white text-xs flex nowrap flex-row space-x-2 justify-center"
								onClick={onClick}
							>
								<text> View Changes</text>
								<img src="/arrowRightWhite.svg" />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div
			className={`bg-[#0C1615] p-4  shadow-md rounded-xl mobile:w-[100%] tablet:max-w-[50%] laptop:max-w-[35%] mt-[15px]  ${
				t.visible ? 'animate-enter' : 'animate-leave'
			}`}
		>
			<div className="flex flex-row space-x-3 items-start">
				{icon}
				<div className="flex flex-col space-y-2">
					<text className="text-white text-sm">{message} </text>
					<text className="text-[#748282] text-xs ">{subMessage}</text>
					<div className="text-[#748282] text-xs border-t-[1px] border-[#30403F] space-x-4 pt-2 flex">
						<text className="text-[#748282]">Learn more</text>
						<button
							className="text-white text-xs flex nowrap flex-row space-x-2 justify-center"
							onClick={onClick}
						>
							<text> View Changes</text>
							<img src="/arrowRightWhite.svg" />
						</button>
					</div>
				</div>
				<div>
					<button
						className="text-white text-sm"
						onClick={() => toast.remove(t.id)}
					>
						<img src="/xClose.svg" />
					</button>
				</div>
			</div>
		</div>
	);
};
