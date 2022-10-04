import toast from 'react-hot-toast';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';

export const WalletNotConnectedModal = ({ open }) => {
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
			className={
				'fixed top-32 right-5  bg-[#DCDEE1] p-4  shadow-md rounded-xl mobile:w-[90%] tablet:max-w-[45%] laptop:max-w-[30%] h-[200px] border-white'
			}
		>
			<div className="flex flex-col items-center ">
				<div className="self-center text-sm  flex-1 ">
					<img src="/alertTriangle.svg" width={'100px'} />
				</div>
				<div className="text-white text-xl flex-2">
					Your wallet is not connected
				</div>
				<div className="text-[#748282] text-sm flex-2 ">
					Connect your wallet and refresh the page.
				</div>
			</div>
		</div>
	);
};
