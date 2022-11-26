import { theme } from '@chakra-ui/react';
import React from 'react';
import { truncateText } from '/utils/truncate.js'
import { useState } from 'react'

export const CopyAddressButton = ({ account, themeObject }) => {

	const [isCopied, setIsCopied] = useState(false);

	const copyAddressToClipboard = async () => {
		await navigator.clipboard
			.writeText(account.toString())
			.then(setIsCopied(true));
		navigator.clipboard.readText();
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<>
			<button
				className={`text-[14px] flex flex-row flex-1 justify-center ${themeObject.textColor} font-Inter items-center ${themeObject.buttonColor}  rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
				onClick={() => {
					console.log("will open dropdown ")
				}}
			>
				<span className="truncate">{truncateText(account)}</span>
				<a
					onClick={() => copyAddressToClipboard()}
					className={'relative'}
				>
					<div className={`visible hover:scale-110 active:scale-125`}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.4733 14.1667H5.6533C4.71997 14.1667 3.95996 13.4067 3.95996 12.4733V5.65336C3.95996 4.72003 4.71997 3.96002 5.6533 3.96002H12.4733C13.4066 3.96002 14.1666 4.72003 14.1666 5.65336V12.4733C14.1666 13.4067 13.4066 14.1667 12.4733 14.1667Z"
								stroke={themeObject.iconTextColor}
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M2.32682 11.5463C2.02016 11.2397 1.8335 10.813 1.8335 10.3463V3.52635C1.8335 2.59301 2.5935 1.83301 3.52684 1.83301H10.3468C10.8735 1.83301 11.3468 2.073 11.6602 2.453"
								stroke={themeObject.iconTextColor}
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<p
						className={
							isCopied == false
								? 'hidden'
								: ` transition ease-in-out duration-300 delay-150 visible z-10 absolute ${themeObject.buttonColor} opacity-70 px-2 py-0.5`
						}
					>
						Copied
					</p>
				</a>
			</button>

		</>
	);
};
