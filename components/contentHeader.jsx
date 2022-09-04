import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const ContentHeader = ({ title, children }) => {

    return (
        <div class='w-[100%] text-inherit py-10'>
            <div class="flex flex-col">
                <div class="flex justify-start">
                    <h3 class='text-2xl font-SG'>{title}</h3>
                </div>
                <div class="flex justify-start">
                    {children}
                </div>
            </div>

        </div>
    )
};