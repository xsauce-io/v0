import { Nav } from './nav';
import { Footer } from './footer';
import { Tabs } from './tabs';
import { Announcement } from './announcement';
import { Countdown } from './countdown';

export const Layout = ({ children }) => {
    return (
        <>
            <div class="items-center justify-center bg-[#EFF1F3] text-black w-screen laptop:px-20 ">

                <div class='w-full'>
                    <Announcement />

                </div>
                <Nav />

                {/* //TODO: Export the div as Hero component */}
                <div class='w-full  py-10 mt-[2rem]'>
                    <grid class="grid grid-cols-3">
                        <div class="col-span-1">
                            <h1 class='laptop:text-5xl py-10'>Xchange</h1>
                        </div>
                        <div class="col-span-2 flex justify-end">
                            <div class="flex flex-col h-full w-1/2  justify-end items-end space-y-4">

                                <button class='bg-[#DCDEE1] rounded-[10px] p-4 w-[100%] hover:opacity-40'>
                                    Learn how the Xchange works
                                </button>

                                <div class='bg-[#DCDEE1] rounded-[10px] p-4 text-left w-[100%]'>
                                    <h1 class="py-2" >FINANCIAL OVERVIEW</h1>
                                    <h1>dedsufbsk</h1>
                                </div>


                            </div>
                        </div>
                    </grid>

                </div>
                <Tabs >
                    <div className=''>{children}</div>
                </Tabs>

                <Footer />
            </div>
        </>
    )
}