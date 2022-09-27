import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

export const Footer = ({ children }) => {
	const screens = {
		mobile: '300',
		tablet: '640',
		laptop: '1200',
		desktop: '1400',
	};

	const { width } = useWindowDimensions();

	// <Script
	// 	strategy="afterInteractive"
	// 	dangerouslySetInnerHTML={{
	// 		__html: `
	//          function mixpanelTrackDocsClick() { mixpanel.track('Sign out');}
	// 		 `,
	// 	}}
	// />;

	return (
		<footer>
			<div className="grid mb-8 tablet:grid tablet:grid-cols-5 laptop:grid-cols-3 mb-16  ">
				<div className="mobile:col-span-5 tablet:col-span-2  laptop:col-span-1 space-y-6">
					<svg
						width="33"
						height="32"
						viewBox="0 0 33 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.6347 17.7117L31.0665 25.0761C32.8526 26.6404 32.5987 29.0007 30.1236 29.0007H25.4634C24.729 29.0007 24.0218 28.7354 23.505 28.2505L17.0678 22.295C16.7505 22.0022 16.2337 22.0022 15.9164 22.295L9.43388 28.2505C8.91709 28.7262 8.21897 28.9915 7.48459 28.9915H2.75189C0.29488 28.9915 -0.929093 26.2653 0.829802 24.6918L8.6995 17.6385C9.20722 17.1811 9.19815 16.4309 8.68136 15.9918L1.46445 9.8259C-0.366972 8.27984 0.838868 5.48962 3.33215 5.48962H7.61152C8.32777 5.48962 9.01682 5.74578 9.52454 6.20319L15.9073 11.8843L22.6347 17.7117Z"
							fill="#000000"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M21.2002 4.42065C19.9736 5.73654 18.9956 6.78574 18.9956 9L19.6487 8.99942C19.903 11.6696 22.1342 13.759 24.8469 13.759C27.73 13.759 30.0691 11.3988 30.0691 8.48961H29.9799C29.8495 6.47727 28.9228 5.49696 27.7687 4.2761C26.8424 3.29619 25.7695 2.16131 24.8444 0.213421C24.7106 -0.0775251 24.2901 -0.0678269 24.1563 0.223119C23.2474 2.22434 22.1494 3.40235 21.2002 4.42065Z"
							fill="#000000"
						/>
					</svg>
					<div className=" text-[36px] tablet:text-[48px] laptop:text-[58px] font-SG">
						The future of <span className="block"> cultural assets </span>
					</div>
					<div className="text-[10px] font-Inter">
						The prediction market known as "The Xchange" is for informational
						and educational purposes only. "The Xchange" is a decentralized
						protocol operated by autonomous smart contracts and does not have
						any vested interest in the outcomes of any market.
					</div>
				</div>
			</div>
			{width >= screens.tablet ? (
				<div className="flex mobile:flex-col   tablet:flex-row py-6 space-x-8 tablet:border-t-[2px] border-black">
					<div className="space-x-10">
						<a
							href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button
								className="text-[12px] font-Inter hover:underline"
								onClick={() => mixpanelTrack('View Whitepaper')}
							>
								Whitepaper
							</button>
						</a>
						<a
							href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button
								className="text-[12px] font-Inter hover:underline"
								onClick={() => mixpanelTrack('View Xchange Beta')}
							>
								Xchange
							</button>
						</a>
						<a
							href="https://docs.xsauce.io/getting-started/introduction"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button
								id="footer_docs_link"
								className="text-[12px] font-Inter hover:underline"
								onClick={() => mixpanelTrack('View Docs')}
							>
								Docs
							</button>
						</a>
					</div>
					<div className="space-x-6 mobile:flex-1 border-t-[2px] border-black  tablet:border-0 flex">
						<a
							href="https://twitter.com/xsauce_io"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View Twitter Page ')}>
								<img className="" src="/twitterIcon.svg" />
							</button>
						</a>
						<a
							href="https://github.com/xsauce-io"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View Github Page ')}>
								<img className="" src="/githubIcon.svg" />
							</button>
						</a>
						<a
							href="https://t.me/xsauce_io"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View Telegram Page ')}>
								<img className="" src="/telegramIcon.svg" />
							</button>
						</a>
						<a
							href="https://angel.co/company/xsauced-1"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View AngelList Page ')}>
								<img className="" src="/angelListIcon.svg" />
							</button>
						</a>
						<div className="flex-1"></div>
						<div className="text-right text-[12px]">© 2022 Xsauce platform</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col flex-row pb-10">
					<div className="space-x-10 pb-10">
						<a
							href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button
								id="footer_whitepaper_link"
								className="text-[12px] hover:underline"
								onClick={() => mixpanelTrack('View Whitepaper')}
							>
								Whitepaper
							</button>
						</a>
						<a
							href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button
								className="text-[12px] hover:underline"
								onClick={() => mixpanelTrack('View Xchange Beta')}
							>
								Xchange
							</button>
						</a>
						<a
							href="https://docs.xsauce.io/getting-started/introduction"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button
								className="text-[12px] hover:underline"
								onClick={() => mixpanelTrack('View Docs ')}
							>
								Docs
							</button>
						</a>
					</div>
					<div className="border-t-[2px] border-black flex pt-10 ml-0 space-x-3">
						<div className="text-left text-[10px] font-Inter">
							© 2022 Xsauce. All rights Reserved.
						</div>
						<div className="flex-1"></div>

						<a
							href="https://twitter.com/xsauce_io"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View Twitter Page')}>
								<img className="" src="/twitterIcon.svg" />
							</button>
						</a>
						<a
							href="https://github.com/xsauce-io"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View Github Page')}>
								<img className="" src="/githubIcon.svg" />
							</button>
						</a>
						<a
							href="https://t.me/xsauce_io"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View Telegram Page')}>
								<img className="" src="/telegramIcon.svg" />
							</button>
						</a>
						<a
							href="https://angel.co/company/xsauced-1"
							target={'_blank'}
							rel={'noreferrer'}
						>
							<button onClick={() => mixpanelTrack('View AngelList Page')}>
								<img className="" src="/angelListIcon.svg" />
							</button>
						</a>
					</div>
				</div>
			)}
		</footer>
	);
};

Footer.defaultProps = {
	children: '',
};
