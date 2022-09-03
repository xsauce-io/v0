import { useRouter } from "next/router"
import React from "react"
import Link from 'next/link'

export const Tabs = (props) => {
    const router = useRouter();


    return (
        <div className="w-full items-center justify-center ">
            <div class="tabs w-[100%] border-black border-b-2 ">
                <Link href="/dashboard">
                    <a class="tab tab-bordered">Dashboard</a>
                </Link>
                <Link href="/livemarkets">
                    <a class="tab tab-bordered tab-active transition ">Live Market</a>
                </Link>
                <Link href="/premarkets">
                    <a class="tab tab-bordered">Pre Market</a>
                </Link>
                <Link href="/cashout">
                    <a class="tab tab-bordered">Cash Out</a>
                </Link>
            </div>
            <div class="py-4">
                {props.children}
            </div>
        </div>
    )
}