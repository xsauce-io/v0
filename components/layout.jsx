import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';
import { FinancialOverview } from './financialOverview'
import { Header } from './header'
import PropTypes from 'prop-types';
import classnames from 'classnames';



// props for bg color, hero header, hero subheader, optional hero box,  Nav colors (text and Icons), tab header and icon

export const Layout = ({ children, headerBg, headerColor, headerTitle, headerSubtitle, showFinancialOverview, logoColor }) => {
    return (

        <div class="bg-[#EFF1F3] text-black w-screen">
            <div className={`laptop:px-20 w-full  items-center justify-center text-black`} style={{ backgroundColor: headerBg, color: headerColor, borderColor: headerColor }} >
                <Announcement />
                <Nav logoColor={logoColor} />
                <Header title={headerTitle} subtitle={headerSubtitle}>
                    {showFinancialOverview === true ? <FinancialOverview /> : <></>}
                </Header>
            </div>
            <div class='w-full items-center  justify-center' >
                <Tabs bgColor={headerBg} >
                    <div class='laptop:px-20'>{children}</div>
                </Tabs>
            </div>
            <div class='laptop:px-20 w-full  items-center justify-center'>
                <Footer />
            </div>

        </div>

    )
}

Layout.defaultProps = {
    headerBg: '#EFF1F3',
    headerColor: 'black',
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