import toast from 'react-hot-toast';

export const ToastNotification = ({ subMessage, icon, message, t }) => {
	return (
		<div
			className={`bg-[#0C1615] p-4  shadow-md rounded-xl mobile:w-[100%] tablet:max-w-[50%] laptop:max-w-[35%]  ${
				t.visible ? 'animate-enter' : 'animate-leave'
			}`}
		>
			<div className="flex flex-row space-x-3 items-start">
				{icon}
				<div className="flex flex-col ">
					<div className="text-white text-sm">{message}</div>
					<div className="text-[#748282] text-xs ">{subMessage}</div>
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
