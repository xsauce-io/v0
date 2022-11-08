import React from "react"

import { PropTypes } from 'prop-types';


export const LayoutHeader = ({ title, children, subtitle }) => {

    return (

        <div className='w-[100%] text-inherit min-h-[130px] '>
            <grid className="grid grid-cols-1 tablet:grid-cols-3">
                <div className="col-span-1 font-SG flex flex-col justify-center ">
                    <p className="text-[#748282] text-xs font-Inter " >{subtitle}</p>
                    <p className='text-5xl py-4 '>{title}</p>
                </div>
                <div className="flex col-span-2 mobile:justify-center tablet:justify-end self-center font-SG mobile:pt-4 pb-16 tablet:pb-0 tablet:pt-0  " >
                    {children}
                </div>
            </grid>

        </div>
    )
};

LayoutHeader.defaultProps = {
    subtitle: '',
    title: '',

};

LayoutHeader.propTypes = {
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

};