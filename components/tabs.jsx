import { useRouter } from "next/router";
import React from "react";
import Link from 'next/link';

export const Tabs = (props) => {
    const router = useRouter();


    return (
        <div className="w-full items-center justify-center">
            <div class="tabs w-[100%] border-black border-b-2">
                <Link href="/">
                    <a class={router.pathname == "/" ? "tab tab-bordered tab-active transition" : "tab tab-bordered  transition"}>Dashboard</a>
                </Link>
                <Link href="/livemarkets">
                    <a class={router.pathname == "/livemarkets" ? "tab tab-bordered tab-active transition" : "tab tab-bordered  transition"}>Live Market</a>
                </Link>
                <Link href="/premarkets">
                    <a class={router.pathname == "/premarkets" ? "tab tab-bordered tab-active transition" : "tab tab-bordered  transition"}>Pre Market</a>
                </Link>
                <Link href="/redeem">
                    <a class={router.pathname == "/redeem" ? "tab tab-bordered tab-active transition" : "tab tab-bordered  transition"}>Cash Out</a>
                </Link>
            </div>
            <div class="py-10">
                {props.children}
            </div>
        </div >
    )
}