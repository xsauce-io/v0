import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';
import { HowItWorksButton } from './howItWorksButton';
import { Header } from './header';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FinancialOverviewCard } from './financialOverviewCard';
import { ContractsCard } from './contractsCard';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

// props for bg color, hero header, hero subheader, optional hero box,  Nav colors (text and Icons), tab header and icon

export const LayoutSimple = ({
	children,
	headerBg,
	headerColor,
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
			</div>

			<div className="w-full items-center justify-center ">{children}</div>
			<div className="mobile:px-5 laptop:px-40 w-full items-center justify-center mt-10">
				<Footer />
			</div>
		</div>
	);
};

LayoutSimple.defaultProps = {
	headerBg: '#0C1615',
	headerColor: 'white',
	headerTitle: 'Xchange',
	headerSubtitle: '',
	logoColor: '#ACFF00',
	tabHeader: 'Position',
	showFinancialOverview: true,
	showHowItWorksButton: false,
};

LayoutSimple.propTypes = {
	headerBg: PropTypes.string,
	children: PropTypes.element,
	logoColor: PropTypes.string,
	showFinancialOverview: PropTypes.bool,
};
