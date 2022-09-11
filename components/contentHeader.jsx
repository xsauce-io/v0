import React from "react"


export const ContentHeader = ({ title, children, icon }) => {

    return (
        <div className='w-[100%] text-inherit py-10 '>
            <div className="flex flex-col tablet:flex-row space-x-4 items-center">
                <div className="flex justify-start space-x-3" >
                    {icon}
                    <p className='text-2xl tablet:text-3xl  font-SG'>{title}</p>
                </div>
                <div className="flex justify-start mobile:mt-4  tablet:mt-0 flex-0">
                    {children}
                </div>
            </div>

        </div>
    )
};

ContentHeader.defaultProps = {

    title: '',
    children: '',
    icon: '',
}