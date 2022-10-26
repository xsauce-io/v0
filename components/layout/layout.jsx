import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { HowItWorksButton } from './howItWorksButton';
import { Header } from './header';
import PropTypes from 'prop-types';
import { FinancialOverviewCard } from './financialOverviewCard';
import { ContractsCard } from './contractsCard';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

// props for bg color, hero header, hero subheader, optional hero box,  Nav colors (text and Icons), tab header and icon

export const Layout = ({
	children,
	headerBg,
	headerColor,
	headerTitle,
	headerSubtitle,
	showFinancialOverview,
	showHowItWorksButton,
	logoColor,
}) => {
	const screens = {
		mobile: '300',
		tablet: '640',
		laptop: '1200',
		desktop: '1400',
	};

	const { width } = useWindowDimensions();

	return (
		<div className="bg-[#EFF1F3] text-black w-screen">
			<div
				className={`w-full items-center justify-center text-black mobile:px-5 laptop:px-40`}
				style={{
					backgroundColor: headerBg,
					color: headerColor,
					borderColor: headerColor,
				}}
			>
				{/* <Announcement /> */}
				<Nav logoColor={logoColor} />
				<Header title={headerTitle} subtitle={headerSubtitle}>
					{showHowItWorksButton === true ? <HowItWorksButton /> : <></>}
					{showFinancialOverview === true && width < '1200' ? (
						<div className="">
							<div className="flex mobile:flex-col mobile:space-y-2 laptop:flex-row laptop:space-x-2 w-full h-full space-y-0  ">
								<FinancialOverviewCard />
								<ContractsCard />
							</div>
						</div>
					) : (
						<></>
					)}
				</Header>
			</div>

			<div className="w-full items-center justify-center ">
				{/* {showFinancialOverview === true && width >= '1200' ? (
					<div className="relative mobile:px-5 laptop:px-40">
						<div className="laptop:absolute bottom-[-147px] right-0 flex space-x-2 w-[62%] px-40 justify-end ">
							<FinancialOverviewCard />
							<ContractsCard />
						</div>
					</div>
				) : (
					<></>
				)} */}

				<Tabs bgColor={headerBg}>
					<div className="mobile:px-5 laptop:px-40">{children}</div>
				</Tabs>
			</div>
			<div className="mobile:px-5 laptop:px-40 w-full items-center justify-center mt-5">
				<Footer />
			</div>
		</div>
	);
};

Layout.defaultProps = {
	headerBg: '#0C1615',
	headerColor: 'white',
	headerTitle: 'Xchange',
	headerSubtitle: '',
	logoColor: '#ACFF00',
	tabHeader: 'Position',
	showFinancialOverview: true,
	showHowItWorksButton: false,
};

Layout.propTypes = {
	headerBg: PropTypes.string,
	children: PropTypes.element,
	logoColor: PropTypes.string,
	showFinancialOverview: PropTypes.bool,
};
