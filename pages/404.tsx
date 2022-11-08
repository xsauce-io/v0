import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';
import { LayoutReduced } from '../components/layout/LayoutReduced';
import Link from 'next/link';

declare var window: any;

const pageNotFound404: NextPage = () => {
	return (
		<LayoutReduced
			headerBg={undefined}
			headerColor={undefined}
			logoColor={undefined}
		>
			<div className=" text-black w-screen h-screen">
				<div className="w-full h-full text-[#0C1615] flex flex-col justify-center items-center ">
					<p className="text-4xl">404</p>
					<p className="text-[80px]"> You good bro? </p>

					<p className="text-xl border-b-4 border-[#ACFF00] p-4">
						This page doesn't exit.
					</p>
					<Link href={'/dripFeed'}>
						<a className="p-4 w-fit text-left text-[#748282] text-lg flex  hover:opacity-60 border-2 border-[#748282] rounded-3xl mt-4">
							<p className="">GO BACK</p>
						</a>
					</Link>
				</div>
			</div>
		</LayoutReduced>
	);
};

export default pageNotFound404;
