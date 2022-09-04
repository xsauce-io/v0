import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';
import { HowItWorksButton } from './howItWorksButton'
import { Header } from './header'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FinancialOverviewCard } from './financialOverviewCard';
import { ContractsCard } from './contractsCard'



// props for bg color, hero header, hero subheader, optional hero box,  Nav colors (text and Icons), tab header and icon

export const Layout = ({ children, headerBg, headerColor, headerTitle, headerSubtitle, showFinancialOverview, logoColor }) => {
    return (

        <div className="bg-[#EFF1F3] text-black w-screen">
            <div className={`laptop:px-40 w-full  items-center justify-center text-black`} style={{ backgroundColor: headerBg, color: headerColor, borderColor: headerColor }} >
                {/* <Announcement /> */}
                <Nav logoColor={logoColor} />
                <Header title={headerTitle} subtitle={headerSubtitle} >

                </Header>

            </div>

            <div className='w-full items-center justify-center'>
                <Tabs bgColor={headerBg} >
                    <div className='laptop:px-40'>{children}</div>
                </Tabs>
                <div className='relative laptop:px-40'>
                    <div className='laptopn: absolute bottom-[940px] right-0 flex space-x-2 w-[60%] px-40 '>
                        <FinancialOverviewCard /> <ContractsCard />
                    </div>
                </div>

            </div>
            <div className='laptop:px-40 w-full items-center justify-center'>
                <Footer />
            </div>

        </div>

    )
}

Layout.defaultProps = {
    headerBg: '#0C1615',
    headerColor: 'white',
    headerTitle: 'Xchange',
    headerSubtitle: '',
    logoColor: '#0C1615',
    tabHeader: 'Position',
    showFinancialOverview: true,
};

Layout.propTypes = {
    headerBg: PropTypes.string,
    children: PropTypes.element,
    logoColor: PropTypes.string,
    showFinancialOverview: PropTypes.bool,

};