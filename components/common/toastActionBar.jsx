import toast from 'react-hot-toast';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensionsTS';

export const ToastNotificationActionBar = ({
	subMessage,
	icon,
	message,
	t,
	href,
	showButton = false,
	buttonText = '',
	onClick = () => { },
}) => {
	const { width, height } = useWindowDimensions();
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	return (
		<>
			{width <= screens.tablet ? (
				<div
					className={`bg-[#DCDEE1] p-4  shadow-md rounded-xl w-full mt-[15px] ${t.visible ? 'animate-flyIn' : 'animate-leave '
						}`}
				>
					<div className="flex flex-col items-start space-y-1">
						<div className="flex flex-row w-full">
							<div className="">{icon}</div>
							<div className="flex-1"></div>
							<button
								className="text-white text-sm flex-2"
								onClick={() => toast.remove(t.id)}
							>
								<img src="/xClose.svg" />
							</button>
						</div>
						<div className="flex flex-col space-y-1 w-full">
							<text className="text-black text-sm">{message} </text>
							<text className="text-[#748282] text-xs ">{subMessage}</text>
							<div className="text-[#748282] text-xs border-t-[1px] border-[#30403F] space-x-4 pt-2 flex">
								<a
									className="text-black text-xs flex nowrap flex-row space-x-1 justify-center hover:opacity-60 active:opacity-60"
									href={href}
									target="_blank"
									rel="noopener noreferrer"
								>
									<text>Learn more</text>
								</a>
								{showButton ? (
									<div className="text-[#0C1615] text-xs flex nowrap flex-row space-x-2 justify-center hover:opacity-60 active:opacity-60">
										<button onClick={onClick} className="text-black   ">
											{buttonText}
										</button>
										<img src="/slimRightArrow.svg" />
									</div>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div
					className={`bg-[#DCDEE1] p-4  shadow-md rounded-xl mobile:w-[100%] tablet:max-w-[50%] laptop:max-w-[35%]   ${t.visible ? 'animate-flyIn' : 'animate-leave '
						}`}
				>
					<div className="flex flex-row space-x-3 items-start">
						<div className="flex-2">{icon}</div>
						<div className="flex flex-col space-y-2 flex-1">
							<text className="text-black text-sm">{message} </text>
							<text className="text-[#748282] text-xs ">{subMessage}</text>
							<div className="text-[#748282] text-xs border-t-[1px] border-[#30403F] space-x-4 pt-2 flex">
								<a
									className="text-[#0C1615] text-xs flex nowrap flex-row space-x-1 justify-center hover:opacity-60 active:opacity-60"
									href={href}
									target="_blank"
									rel="noopener noreferrer"
								>
									<text>Learn more</text>
								</a>
								{showButton ? (
									<div className="text-[#0C1615] text-xs flex nowrap flex-row space-x-2 justify-center hover:opacity-60 active:opacity-60">
										<button onClick={onClick} className="text-black   ">
											{buttonText}
										</button>
										<img src="/slimRightArrow.svg" />
									</div>
								) : (
									<></>
								)}
							</div>
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
			)}
		</>
	);
};
