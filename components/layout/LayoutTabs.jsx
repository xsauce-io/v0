import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export const LayoutTabs = ({ children, bgColor }) => {
	const router = useRouter();

	return (
		<div className="w-full items-center justify-center border-0">
			<div
				className="px-5 laptop:px-40 font-Inter border-0"
				style={{ backgroundColor: bgColor }}
			>
				<div className="tabs border-[#000] border-b-[1px] border-t-[0px] w-full text-white space-x-3 tablet:space-x-8 ">
					<Link href="/dripFeed" className={
								router.pathname == '/dripFeed'
									? 'tab border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm '
									: 'tab transition mobile:text-xs tablet:text-sm text-[#748282] px-0 '
							}
							style={
								router.pathname == '/dripFeed' ? { color: 'inherit' } : null
							}>

							Drip Feed

					</Link>
					<Link href="/markets" className={
								router.pathname == '/markets'
									? 'tab border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm '
									: 'tab transition mobile:text-xs tablet:text-sm text-[#748282] px-0 '
							}
							style={
								router.pathname == '/markets' ? { color: 'inherit' } : null
							}>
						Markets
					</Link>

					{/* <Link href="/freePlay">
						<a
							className={
								router.pathname == '/freePlay'
									? 'tab border-[#ACFF00] border-b-[3px] transition text-black px-0 mobile:text-xs tablet:text-sm'
									: 'tab transition text-[#748282] px-0 mobile:text-xs tablet:text-sm'
							}
							style={
								router.pathname == '/freePlay' ? { color: 'inherit' } : null
							}
						>
							Free play
						</a>
					</Link> */}

					<Link href="/calendar"
							className={
								router.pathname == '/calendar'
									? 'tab border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm '
									: 'tab transition mobile:text-xs tablet:text-sm text-[#748282] px-0 '
							}
							style={
								router.pathname == '/calendar' ? { color: 'inherit' } : null
							}>
						Calendar
					</Link>

					<Link href="/portfolio" className={
								router.pathname == '/portfolio'
									? 'tab border-[#ACFF00] border-b-[3px] transition text-black px-0 mobile:text-xs tablet:text-sm'
									: 'tab transition text-[#748282] px-0 mobile:text-xs tablet:text-sm'
							}
							style={
								router.pathname == '/portfolio' ? { color: 'inherit' } : null
							}>
						Portfolio
					</Link>
				</div>
			</div>
			<div className="pb-10">{children}</div>
		</div>
	);
};
