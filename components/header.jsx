import React from "react"

import { PropTypes } from 'prop-types';


export const Header = ({ title, children, subtitle }) => {

    return (

        <div className='w-[100%] pt-10 mt-[2rem] text-inherit min-h-[200px] '>
            <grid className="grid grid-cols-3">
                <div className="col-span-1 font-SG">
                    <p className="text-[#748282] text-sm  font-SG" >{subtitle}</p>
                    <p className='text-5xl py-4 '>{title}</p>
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
    title: '',

};

Header.propTypes = {
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

};