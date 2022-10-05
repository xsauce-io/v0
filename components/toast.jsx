import toast from 'react-hot-toast';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';

export const ToastNotification = ({ subMessage, icon, message, t }) => {
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
				className={`p-4  shadow-md rounded-xl w-full  mt-[30px]  bg-[#DCDEE1]
				} ${t.visible ? 'animate-flyIn' : 'animate-leave '}`}
			>
				<div className="flex flex-col items-start space-y-1">
					<div className="flex flex-row w-full">
						<div className="flex-2">{icon}</div>

						<div className="flex-1"></div>
						<button
							className="text-sm flex-2"
							onClick={() => toast.remove(t.id)}
						>
							<img src="/xClose.svg" />
						</button>
					</div>
					<div className="flex flex-col space-y-1">
						<text className="text-black text-sm">{message} </text>
						<text className="text-[#748282] text-xs ">{subMessage}</text>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`bg-[#DCDEE1] p-4  shadow-md rounded-xl mobile:w-[100%] tablet:max-w-[50%] laptop:max-w-[35%] mt-[15px]  ${
				t.visible ? 'animate-flyIn' : 'animate-leave'
			}`}
		>
			<div className="flex flex-row space-x-3 items-start">
				<div className="flex-2">{icon}</div>

				<div className="flex flex-col flex-1 ">
					<div className="text-black text-sm">{message}</div>
					<div className="text-[#748282] text-xs ">{subMessage}</div>
				</div>
				<div className="flex-2">
					<button
						className="text-black text-sm"
						onClick={() => toast.remove(t.id)}
					>
						<img src="/xClose.svg" />
					</button>
				</div>
			</div>
		</div>
	);
};
