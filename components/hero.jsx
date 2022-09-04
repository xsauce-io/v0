import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const Hero = ({ title, detailsVisibility, children }) => {

    return (

        <div class='w-[100%] py-14 mt-[2rem] text-inherit min-h-[300px]'>
            <grid class="grid grid-cols-3">
                <div class="col-span-1">
                    <h5 class="text-[#748282]">Live derivatives market</h5>
                    <h1 class='text-5xl  py-4'>{title}</h1>
                </div>
                <div class="col-span-2 flex justify-end" >
                    {children}
                </div>
            </grid>

        </div>
    )
};