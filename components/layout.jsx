import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';

export const Layout = ({ children }) => {
    return (
        <>
            <div class="items-center justify-center bg-[#E5E5E5] w-screen  laptop:px-20 ">

                <div className='w-full'>
                    <Announcement />
                </div>
                <Nav />

                {/* //TODO: Export the div as Hero component */}
                <div className='border-[blue] border-2 w-full '>
                    <grid class="grid grid-cols-3">
                        <div class="col-span-1"><h1 className='laptop:text-7xl py-10'>Xchange</h1></div>
                        <div class="col-span-2 justify-right">
                            <div class="flex h-full w-full bg-[grey] justify-end">
                                <h1></h1>


                            </div>
                        </div>
                    </grid >

                </div>
                <Tabs className='w-full'>
                    <div className='border-[blue] border-2'>{children}</div>
                </Tabs>

                <Footer />
            </div >
        </>
    )
}