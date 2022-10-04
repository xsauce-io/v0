import { duration } from '@mui/material';
import type { NextPage } from 'next';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/toast';
import { ToastNotificationActionBar } from '../components/toastActionBar';
import { WalletNotConnectedModal } from '../components/walletNotConnectedModal';

import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';
const screens = {
	mobile: '300',
	tablet: '640',
	smlaptop: '1024',
	laptop: '1200',
	desktop: '1400',
};
const Testing: NextPage = () => {
	const windowDimensions = useWindowDimensions();
	const width = windowDimensions?.width;
	const height = windowDimensions?.height;

	const notify = () =>
		toast.custom(
			(t) => (
				<ToastNotificationActionBar
					message={'You have made this wager for this shoe in a successful way'}
					subMessage={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
					}
					icon={<img src="/checkCircle.svg" />}
					t={t}
					onClick={() => alert('view changes')}
				/>
			),
			{ duration: 2000 }
		);

	const notifyTwo = () =>
		toast.custom(
			(t) => (
				<ToastNotification
					message={'You have made this wager for this shoe in a successful way'}
					subMessage={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
					}
					icon={<img src="/checkCircle.svg" />}
					t={t}
				/>
			),
			{ duration: 2000 }
		);

	const notifyError = () =>
		toast.custom(
			(t) => (
				<ToastNotification
					message={'You broke our entire application man, why did you do this?'}
					subMessage={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
					}
					icon={<img src="/alertCircle.svg" />}
					t={t}
				/>
			),
			{ duration: 2000 }
		);

	const notifyWarning = () =>
		toast.custom(
			(t) => (
				<ToastNotification
					message={'What you did didn’t make any sense buddy, go and fix it'}
					subMessage={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
					}
					icon={<img src="/alertTriangle.svg" />}
					t={t}
				/>
			),
			{ duration: 2000 }
		);

	return (
		<div className="w-full h-full flex flex-col justify-center items-center space-y-5 ">
			<button className="p-4 text-black border-2" onClick={notify}>
				Make me a extented toast
			</button>
			<button className="p-4 text-black border-2" onClick={notifyTwo}>
				Make me a success toast
			</button>

			<button className="p-4 text-black border-2" onClick={notifyError}>
				Make me a error toast
			</button>
			<button className="p-4 text-black border-2" onClick={notifyWarning}>
				Make me a warning oast
			</button>
		</div>
	);
};

export default Testing;
