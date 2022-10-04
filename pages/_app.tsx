import '../styles/globals.css';
import type { AppProps } from 'next/app';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { hotjar } from 'react-hotjar';
import { FirstTimeVisitorModal } from '../components/firstTimeVisitorModal';

/**
 * Send mix panel event
 * @param event_name
 * @param props
 */
export const event = (event_name: string, props: any) => {
	try {
		if ((window as any).mixpanel) {
			(window as any).mixpanel.track(event_name, props);
		}
	} catch (e) {
		console.log(e);
	}
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	//Mix Panel setup
	useEffect(() => {
		const handleRouteChange = (url: any) => {
			//Send track event when new pages is loaded

			event('Page view', {
				url,
			});
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				<title>Xsauce</title>
			</Head>
			{typeof window != 'undefined' && !(window as any).mixpanel && (
				//<!-- Mixpanel Tracking Code for -->
				<Script
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
							for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
							MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
							mixpanel.init('6932a1740fbe2e1b17edefc3fc297840', {debug: true});
							mixpanel.track('Site Accessed');
			 				`,
					}}
				/>
			)}

			<Script
				//<!-- Mixpanel Tracking Functions for -->

				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `

                    function mixpanelTrack(message) { mixpanel.track(message);}
					function mixpanelTrackProps(message , props) { mixpanel.track(message , props);}
			 `,
				}}
				onError={(e) => {
					console.error('Script failed to load', e);
				}}
			/>

			<Script
				//<!-- Hotjar Tracking Code for -->
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
							(function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
							h._hjSettings={hjid:3172590,hjsv:6};
							a=o.getElementsByTagName('head')[0];
							r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
							a.appendChild(r);
							})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
						`,
				}}
			/>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-PB1DF7QVNM"
				strategy="afterInteractive"
			/>

			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
							window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PB1DF7QVNM');
						`,
				}}
			/>
			<Component {...pageProps} />
			<FirstTimeVisitorModal />
			<Toaster
				position="top-right"
				gutter={0}
				toastOptions={{ duration: 2000 }}
				containerStyle={{ top: '104px' }}
			/>
		</>
	);
}

export default MyApp;
