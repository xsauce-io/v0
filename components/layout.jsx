import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';
import { FinancialOverview } from './financialOverview'
import { Hero } from './hero'
import PropTypes from 'prop-types';
import classnames from 'classnames';



// props for bg color, hero header, hero subheader, optional hero box,  Nav colors (text and Icons), tab header and icon

export const Layout = ({ children, headerBg, headerColor, heroTitle, showFinancialOverview, logoColor, tabHeader }) => {
    return (

        <div class="bg-[#EFF1F3] text-black w-screen">
            <div className={`laptop:px-20 w-[full]  items-center justify-center text-black`} style={{ backgroundColor: headerBg, color: headerColor, borderColor: headerColor }} >
                <Announcement />
                <Nav logoColor={logoColor} />
                <Hero title={heroTitle}>
                    {showFinancialOverview === true ? <FinancialOverview /> : <></>}

                </Hero>
            </div>
            <div class='w-[full] items-center  justify-center' >
                <Tabs bgColor={headerBg} >
                    <div class='laptop:px-20'>{children}</div>
                </Tabs>

            </div>
            <div class='laptop:px-20 w-[full]  items-center justify-center'>

                <Footer />
            </div>

        </div>

    )
}

Layout.defaultProps = {
    headerBg: '#EFF1F3',
    headerColor: 'black',
    heroTitle: 'Xchange',
    heroBoxHidden: false,
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