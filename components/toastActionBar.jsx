import toast from 'react-hot-toast';

export const ToastNotificationActionBar = ({
	subMessage,
	icon,
	message,
	t,
	onClick,
}) => {
	return (
		<div
			className={`bg-[#0C1615] p-4  shadow-md rounded-xl mobile:w-[100%] tablet:max-w-[50%] laptop:max-w-[35%]  ${
				t.visible ? 'animate-enter' : 'animate-leave'
			}`}
		>
			<div className="flex flex-row space-x-3 items-start">
				{icon}
				<div className="flex flex-col space-y-2">
					<text className="text-white text-sm">{message} </text>
					<text className="text-[#748282] text-xs ">{subMessage}</text>
					<div className="text-[#748282] text-xs border-t-[1px] border-[#30403F] space-x-4 pt-2">
						<text className="text-[#748282]">Learn more</text>
						<button className="text-white text-sm" onClick={onClick}>
							View Changes
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
