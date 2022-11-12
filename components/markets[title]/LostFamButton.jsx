import React from 'react';
import { useEffect, useState, useRef } from 'react';

export const LostFamButton = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    function handleClickOutside() {
        setOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, []);

    return (
        <div className="px-3 " ref={ref} >
            <div className="w-fit px-1 group relative underline font-SG">
                <button onClick={() => setOpen((previousState)=> !previousState)} className='font-SG hover:opacity-70 underline'>I am lost fam</button>
                {open ?
                    <span className='absolute bg-black bottom-8 right-0 w-[240px] text-sm bg-black p-3 text-white opacity-90 rounded-2xl text-left '>
                        <a target="blank" rel='noreferrer' href="https://discord.com/channels/@me/moonman#8829/" className='text-[#ACFF00]'>Click here</a> to send a message to the Xsauce team for 1 on 1 support.
                    </span>: <></>
                    }
            </div>
        </div>
    )
}
