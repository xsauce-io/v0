import { LayoutNavBar } from './LayoutNavBar';
import { LayoutFooter } from './LayoutFooter';
import PropTypes from 'prop-types';

// props for bg color, hero header, hero subheader, optional hero box,  Nav colors (text and Icons), tab header and icon

export const LayoutReduced = ({
	children,
	headerBg,
	headerColor,
	logoColor,
}) => {


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
				<LayoutNavBar logoColor={logoColor} />
			</div>

			<div className="w-full items-center justify-center ">{children}</div>
			<div className="mobile:px-5 laptop:px-40 w-full items-center justify-center mt-10">
				<LayoutFooter />
			</div>
		</div>
	);
};

LayoutREduced.defaultProps = {
	headerBg: '#0C1615',
	headerColor: 'white',
	headerTitle: 'Xchange',
	logoColor: '#ACFF00',

};

LayoutReduced.propTypes = {
	headerBg: PropTypes.string,
	children: PropTypes.element,
	logoColor: PropTypes.string,

};
