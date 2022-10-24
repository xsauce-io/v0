import toast from 'react-hot-toast';
import { useWindowDimensions } from '../../utils/hooks/useWindowDimensionsTS';

export const WalletNotConnectedModal = ({ open, positionTop }) => {
	const { width, height } = useWindowDimensions();
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	if (open == false) {
		return <></>;
	}
	return (
		<div
			className={`fixed  right-5 laptop:right-40  bg-[#0C1615] p-4  shadow-md rounded-xl mobile:w-[90%] tablet:max-w-[45%] laptop:max-w-[28%] h-[200px] border-2 border-[#748282] opacity-80 ${
				positionTop ? 'top-24' : 'top-48'
			}`}
		>
			<div className="flex flex-col items-center justify-center">
				<div className="self-center text-sm  flex-1 ">
					<img src="/alertTriangle.svg" width="100px" />
				</div>
				<div className="text-white text-xl flex-2 ">
					Your wallet is not connected
				</div>
				<div className="text-[#748282] text-sm flex-2 ">
					Connect your wallet and refresh the page.
				</div>
			</div>
		</div>
	);
};
