import '../styles/globals.css';
import type { AppProps } from 'next/app';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />

			<Toaster
				position="top-right"
				gutter={14}
				toastOptions={{ duration: 2000 }}
				containerStyle={{ top: '104px' }}
			/>
		</>
	);
}

export default MyApp;
