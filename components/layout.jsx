import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';

export const Layout = ({ children }) => {
    return (
        <>
            <div className='w-full'>
                <Announcement />
            </div>


            <Nav />
            <div >
                <h1 className='fontSize-[20px]'>Xchange</h1>


            </div>
            <Tabs >
                <main className='w-full' >{children}</main>
            </Tabs>

            <Footer />
        </>
    )
}