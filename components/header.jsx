import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { PropTypes } from 'prop-types';


export const Header = ({ title, children, subtitle }) => {

    return (

        <div class='w-[100%] py-14 mt-[2rem] text-inherit min-h-[300px]'>
            <grid class="grid grid-cols-3">
                <div class="col-span-1 font-SG">
                    <h5 class="text-[#748282] text-sm">{subtitle}</h5>
                    <h1 class='text-5xl  py-4'>{title}</h1>
                </div>
                <div class="col-span-2 flex justify-end" >
                    {children}
                </div>
            </grid>

        </div>
    )
};

Header.defaultProps = {
    subtitle: '',

};

Header.propTypes = {
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),


};