import { useRouter } from "next/router";
import React from "react";
import Link from 'next/link';

export const Tabs = ({ children, bgColor }) => {
    const router = useRouter();


    return (
        <div className="w-full items-center justify-center" >
            <div class="laptop:px-20" style={{ backgroundColor: bgColor }}>
                <div class="tabs border-black border-b-[1px] w-full">
                    <Link href="/">
                        <a class={router.pathname == "/" ? "tab border-[#ACFF00] border-b-[3px] transition text-black" : "tab transition"}>Dashboard</a>
                    </Link>
                    <Link href="/livemarkets">
                        <a class={router.pathname == "/livemarkets" ? "tab border-b-[3px] border-[#ACFF00] transition text-black " : "tab transition"}>Live Market</a>
                    </Link>
                    <Link href="/premarkets">
                        <a class={router.pathname == "/premarkets" ? "tab border-[#ACFF00] border-b-[3px] transition text-black" : "tab transition"}>Pre Market</a>
                    </Link>
                    <Link href="/redeem">
                        <a class={router.pathname == "/redeem" ? "tab border-[#ACFF00] border-b-[3px] transition text-black" : "tab transition"}>Cash Out</a>
                    </Link>
                </div>
            </div>
            <div class="py-10">
                {children}
            </div>
        </div>
    )
}