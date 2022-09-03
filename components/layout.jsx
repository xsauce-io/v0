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
                                    <grid class="grid grid-cols-3">
                                        <div class="grid grid-rows-2">
                                            <div class="text-[grey]">Positions</div>
                                            <div>12 positions</div>
                                        </div>
                                        <div class="grid grid-rows-2">
                                            <div class="text-[grey]">Xsauce tokens</div>
                                            <div>3,702 $SAUX</div>
                                        </div>
                                        <div class="grid grid-rows-2">
                                            <div></div>
                                            <div ><button class="rounded-2xl px-3 bg-[#ACFF00] "> redeem</button></div>
                                        </div>

                                    </grid>
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