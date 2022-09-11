import React from "react"

import { PropTypes } from 'prop-types';


export const Header = ({ title, children, subtitle }) => {

    return (

        <div className='w-[100%] mobile:mt-[5rem] tablet:mt-[2rem] text-inherit min-h-[200px] '>
            <grid className="grid grid-cols-1 tablet:grid-cols-3">
                <div className="col-span-1 font-SG flex flex-col justify-center">
                    <p className="text-[#748282] text-sm font-SG " >{subtitle}</p>
                    <p className='text-5xl py-4 '>{title}</p>
                </div>
                <div className="flex col-span-2 mobile:justify-center tablet:justify-end font-SG mobile:pt-4 pb-16 tablet:pb-0 tablet:pt-0  " >
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