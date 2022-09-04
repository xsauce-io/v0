import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { PropTypes } from 'prop-types';


export const Header = ({ title, children, subtitle }) => {

    return (

        <div className='w-[100%] pt-10 mt-[2rem] text-inherit '>
            <grid className="grid grid-cols-3">
                <div className="col-span-1 font-SG">
                    <h5 className="text-[#748282] text-sm">{subtitle}</h5>
                    <h1 className='text-5xl py-4'>{title}</h1>
                </div>
                <div className="col-span-2 flex justify-end font-SG" >
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