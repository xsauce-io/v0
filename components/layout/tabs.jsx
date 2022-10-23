import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export const Tabs = ({ children, bgColor }) => {
	const router = useRouter();

	return (
		<div className="w-full items-center justify-center border-0">
			<div
				className="px-5 laptop:px-40 font-Inter border-0"
				style={{ backgroundColor: bgColor }}
			>
				<div className="tabs border-[#000] border-b-[1px] border-t-[0px] w-full text-white space-x-3 tablet:space-x-8 ">
					{/* <Link href="/">
						<a
							className={
								router.pathname == '/'
									? 'tab border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm '
									: 'tab transition mobile:text-xs tablet:text-sm text-[#748282] px-0 '
							}
							style={router.pathname == '/' ? { color: 'inherit' } : null}
						>
							Dripfeed
						</a>
					</Link> */}
					<Link href="/freeplay">
						<a
							className={
								router.pathname == '/freeplay'
									? 'tab border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm '
									: 'tab transition mobile:text-xs tablet:text-sm text-[#748282] px-0 '
							}
							style={
								router.pathname == '/freeplay' ? { color: 'inherit' } : null
							}
						>
							Free Play
						</a>
					</Link>
					<Link href="/calendar">
						<a
							className={
								router.pathname == '/calendar'
									? 'tab border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm '
									: 'tab transition mobile:text-xs tablet:text-sm text-[#748282] px-0 '
							}
							style={
								router.pathname == '/calendar' ? { color: 'inherit' } : null
							}
						>
							Calendar
						</a>
					</Link>
					<Link href="/livemarkets">
						<a
							className={
								router.pathname == '/livemarkets'
									? 'tab border-b-[3px] border-[#ACFF00] transition text-black px-0 mobile:text-xs tablet:text-sm'
									: 'tab transition text-[#748282] px-0 mobile:text-xs tablet:text-sm'
							}
							style={
								router.pathname == '/livemarkets' ? { color: 'inherit' } : null
							}
						>
							Live Market
						</a>
					</Link>
					<Link href="/redeem">
						<a
							className={
								router.pathname == '/redeem'
									? 'tab border-[#ACFF00] border-b-[3px] transition text-black px-0 mobile:text-xs tablet:text-sm'
									: 'tab transition text-[#748282] px-0 mobile:text-xs tablet:text-sm'
							}
							style={router.pathname == '/redeem' ? { color: 'inherit' } : null}
						>
							Cash Out
						</a>
					</Link>
					<Link href="/portfolio">
						<a
							className={
								router.pathname == '/portfolio'
									? 'tab border-[#ACFF00] border-b-[3px] transition text-black px-0 mobile:text-xs tablet:text-sm'
									: 'tab transition text-[#748282] px-0 mobile:text-xs tablet:text-sm'
							}
							style={
								router.pathname == '/portfolio' ? { color: 'inherit' } : null
							}
						>
							Portfolio
						</a>
					</Link>
				</div>
			</div>
			<div className="pb-10">{children}</div>
		</div>
	);
};
