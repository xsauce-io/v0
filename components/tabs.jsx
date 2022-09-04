import { useRouter } from "next/router";
import React from "react";
import Link from 'next/link';

export const Tabs = ({ children, bgColor }) => {
    const router = useRouter();


    return (
        <div className="w-full items-center justify-center" >
            <div className="laptop:px-40 font-SG" style={{ backgroundColor: bgColor }}>
                <div className="tabs border-black border-b-[1px] w-full text-white" >
                    <Link href="/">
                        <a className={router.pathname == "/" ? "tab border-[#ACFF00] border-b-[3px] transition " : "tab transition  text-[#748282]"} style={router.pathname == "/" ? { color: 'inherit' } : null}>Dashboard</a>
                    </Link>
                    <Link href="/livemarkets">
                        <a className={router.pathname == "/livemarkets" ? "tab border-b-[3px] border-[#ACFF00] transition text-black " : "tab transition text-[#748282]"} style={router.pathname == "/livemarkets" ? { color: 'inherit' } : null}>Live Market</a>
                    </Link>
                    <Link href="/premarkets">
                        <a className={router.pathname == "/premarkets" ? "tab border-[#ACFF00] border-b-[3px] transition text-black" : "tab transition text-[#748282]"} style={router.pathname == "/premarkets" ? { color: 'inherit' } : null} >Pre Market</a>
                    </Link>
                    <Link href="/redeem">
                        <a className={router.pathname == "/redeem" ? "tab border-[#ACFF00] border-b-[3px] transition text-black" : "tab transition text-[#748282]"} style={router.pathname == "/redeem" ? { color: 'inherit' } : null}>Cash Out</a>
                    </Link>
                </div>
            </div>
            <div className="pb-10">
                {children}
            </div>
        </div>
    )
}