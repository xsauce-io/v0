import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export const Tabs = ({ children, bgColor }) => {
	const router = useRouter();

	return (
		<div className="w-full items-center justify-center border-0">
			<div
				className="px-5 laptop:px-40 font-Inter border-0 "
				style={{ backgroundColor: bgColor }}
			>
				<div className=" border-[#000] border-b-[1px] border-t-[0px] w-full text-white space-x-3 tablet:space-x-8 flex flex-nowrap ">
					<Link href="/">
						<a
							className={
								router.pathname == '/'
									? 'flex flex-row items-center text-center border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm  pb-1'
									: 'flex flex-row items-center text-center transition mobile:text-xs tablet:text-sm text-[#748282] px-0  pb-1'
							}
							style={router.pathname == '/' ? { color: 'inherit' } : null}
						>
							Home
						</a>
					</Link>
					<Link href="/calendar">
						<a
							className={
								router.pathname == '/calendar'
									? 'flex flex-row items-center text-center border-[#ACFF00] border-b-[3px] transition px-0 mobile:text-xs tablet:text-sm  pb-1'
									: 'flex flex-row items-center text-center transition mobile:text-xs tablet:text-sm text-[#748282] px-0 pb-1'
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
									? 'flex flex-row items-center text-center border-b-[3px] border-[#ACFF00] transition text-black px-0 mobile:text-xs tablet:text-sm pb-1'
									: 'flex flex-row items-center  text-center transition text-[#748282] px-0 mobile:text-xs tablet:text-sm pb-1'
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
									? ' flex flex-row items-center text-center border-[#ACFF00] border-b-[3px] transition text-black px-0 mobile:text-xs tablet:text-sm pb-1'
									: 'flex flex-row items-center text-center transition text-[#748282] px-0 mobile:text-xs tablet:text-sm pb-1'
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
									? 'flex flex-row items-center text-center justify-center border-[#ACFF00] border-b-[3px] transition text-black px-0 mobile:text-xs tablet:text-sm pb-1'
									: 'flex flex-row items-center text-center transition text-[#748282] px-0 mobile:text-xs tablet:text-sm pb-1'
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
