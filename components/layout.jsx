import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';
import { Hero } from './hero'
import { Countdown } from './countdown';
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const Layout = ({ children }) => {
    return (
        <>
            <div class="items-center justify-center bg-[#EFF1F3] text-black w-screen laptop:px-20 ">

                <div class='w-full'>
                    <Announcement />

                </div>
                <Nav />

                <Hero />
                <Tabs >
                    <div className=''>{children}</div>
                </Tabs>

                <Footer />
            </div>
        </>
    )
}