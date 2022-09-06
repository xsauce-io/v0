import React from "react"


export const ContentHeader = ({ title, children }) => {

    return (
        <div className='w-[100%] text-inherit py-10 '>
            <div className="flex flex-row space-x-4 items-center">
                <div className="flex justify-start">
                    <h3 className='text-3xl font-SG'>{title}</h3>
                </div>
                <div className="flex justify-start">
                    {children}
                </div>
            </div>

        </div>
    )
};

ContentHeader.defaultProps = {

    title: '',
    children: ''
}