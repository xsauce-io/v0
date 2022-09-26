import React from 'react';
import { BigNumber, ethers, utils } from 'ethers';

import marketabi from '../abi/markets.json';
import $tableABI from '../abi/$tableSauce.json';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ToastNotificationActionBar } from '../components/toastActionBar';
import alertCircle from '../public/alertCircle.svg'
import { useRouter } from 'next/router';
import {
	$tableAddress,
	Mockaddress,
	OrderBookAddressGit,
	OrderBookGit,
} from '../services/constants';
import { useGetMarketBySku } from '../services/useRequests';
import toast from 'react-hot-toast';
import { ToastNotification } from './toast';

export const ActionCard = () => {
	// -------------------------- router ----------------------
	const router = useRouter();
	const { sku } = router.query;

	// -------------------- Data Fetching ------------------

	const { data, error } = useGetMarketBySku(sku);

	// ------------------- State Variable --------------------
	const [isSet, setIsSet] = useState(false);
	const [alignment, setAlignment] = useState();
	const [isYes, setIsYes] = useState();
	const [No, setNo] = useState();
	const [Yes, setYes] = useState();
	const [priceOfYes, setPriceYes] = useState();
	const [priceOfNo, setPriceNo] = useState();

	const [isBuy, setIsBuy] = useState();
	const [currentQuote, setCurrentQuote] = useState();
	const [orderBookAbi, setOrderBookAbi] = useState(null);
	const [orderBookAddress, setOrderBookAddress] = useState(null);
	const [signedContract, setSignedContract] = useState(null);
	const [currentMarket, setCurrentMarket] = useState(data);
	const [expiration, setExpiration] = useState();
	const [jackpotTotal, setJackpot] = useState();

	//------------------ Functions ------------------

	const jackpot = async () => {
    try {
    
		if (currentMarket !== undefined) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', [0]);
			const signer = provider.getSigner();
			const $table = new ethers.Contract($tableAddress, $tableABI, signer);
			const totalJackpot = (
				(await $table.balanceOf(currentMarket.address)) / 1e18
			).toFixed(2);

			setJackpot(totalJackpot);
		}
  } catch (error) {
      console.log(error)
  }


	};

	const approve$auce = async () => {
		if (isSet == true) {
			return;
		}
   
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const address = (await provider.send('eth_requestAccounts', [])).toString();
		const signer = provider.getSigner();
		const $table = new ethers.Contract($tableAddress, $tableABI, signer);
		const allowance = await $table.allowance(address, currentMarket.address);


		if (allowance > 100000 * (10 ** 18)) {
		} else {

      try {
			const approvedAmount = BigNumber.from('2')
				.pow(BigNumber.from('256'))
				.sub('1');

			await $table.approve(
				currentMarket.address,
				BigNumber.from(approvedAmount)
			)}
      catch (error) {
    if (error.code == "ACTION_REJECTED") {
    toast.custom(
			(t) => (
				<ToastNotification
					message={"You rejected the transaction"}
					subMessage={
						"If you did this by mistake, please go back to live markets and try again"
					}
					icon={<img src="/alertCircle.svg" />}
					t={t}
				/>
			),
			{ duration: 7000 }
		);
  } else {console.log(error.code)}
};
}
  
	};

	const mint = async (e) => {
		e.preventDefault();
    let mintedAmount;

    try {

		const data = new FormData(e.target);
		mintedAmount = data.get('Amount');
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		const market = new ethers.Contract(
			currentMarket.address,
			marketabi,
			signer
		);
		let signedContract = market.connect(signer);
		setSignedContract(signedContract);
		let position;
		if (isYes === true) {
			position = 1;
		} else {
			position = 2;
		}
		
		const order = await signedContract.mint(
			BigNumber.from(position),
			BigNumber.from(data.get('Amount'))
		);

    order.then(()=> {let positionMinted;
      if (isYes === true) { positionMinted = "Yes"}
      else {positionMinted = "No"}
      toast.custom(
        (t) => (
          <ToastNotification
            message={"Transaction Successful"}
            subMessage={
              `You bought ${mintedAmount} ${positionMinted} tokens`
            }
            icon={<img src="/checkCircle.svg" />}
            t={t}
          />
        ),
        { duration: 7000 }
      )})
	} 
    catch (error) {
      if (error.code == "ACTION_REJECTED") {
      toast.custom(
        (t) => (
          <ToastNotification
            message={"You rejected the transaction"}
            subMessage={
              "If you did this by mistake, please go back to live markets and try again"
            }
            icon={<img src="/alertTriangle.svg" />}
            t={t}
          />
        ),
        { duration: 7000 }
      );
    } else if(error.reason == "execution reverted: ERC20: insufficient allowance") {
     
      toast.custom(
        (t) => (
          <ToastNotification
            message={"Transaction Failed"}
            subMessage={
              "You have not approved our contract to interact with your wallet. please make sure you are connected to the right network and try again"
            }
            icon={<img src="/alertCircle.svg" />}
            t={t}
          />
        ),
        { duration: 7000 }
      )
    } else {
      toast.custom(
      (t) => (
        <ToastNotification
          message={"Transaction Failed"}
          subMessage={
            "Something went wrong, please make sure you are connected to the right network and try again"
          }
          icon={<img src="/alertCircle.svg" />}
          t={t}
        />
      ),
      { duration: 7000 }
    )}
  }
 
}

	

	
	const ratios = async () => {
    try {
		if (currentMarket !== undefined) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(
				currentMarket?.address,
				marketabi,
				signer
			);
			const getYes = await contract.totalSupply(1);
			const getNo = await contract.totalSupply(2);

			let NoRatio =
				(getNo.toNumber() / (getYes.toNumber() + getNo.toNumber())) * 100;

			let YesRatio =
				(getYes.toNumber() / (getYes.toNumber() + getNo.toNumber())) * 100;
			console.log(YesRatio);

			setYes(YesRatio.toFixed(0));
			setNo(NoRatio.toFixed(0));
		}
	}   catch (error) {
      console.log(error)
  }
  }
	const prices = async () => {
		if (currentMarket !== undefined) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(
				currentMarket?.address,
				marketabi,
				signer
			);
			const getYes = await contract.totalSupply(1);
			const getNo = await contract.totalSupply(2);

			let priceNo = getNo.toNumber() / (getYes.toNumber() + getNo.toNumber());

			let priceYes = getYes.toNumber() / (getYes.toNumber() + getNo.toNumber());

			setPriceYes(priceYes.toFixed(2));
			setPriceNo(priceNo.toFixed(2));
		}
	};

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
		setCurrentMarket(data);
	}, [data]);



	useEffect(() => {
		ratios();
		prices();
		jackpot();
	}, [currentMarket]);

	useEffect(() => {
		if (currentMarket !== undefined && isSet === false) {
			approve$auce();
		}
		setIsSet(true);
	}, [currentMarket]);

	return (
		<div className="flex flex-col justify-start border-[1px] border-[#0C1615] rounded-[10px] text-black">
			<div className="bg-[#ACFF00]  rounded-t-[10px] border-b-[1px] p-2  w-[100%]  border-[#0C1615]" />
			<div className="bg-white p-4 text-left w-[100%] border-b-[1px] border-[#0C1615]">
				<flex className="flex flex-rows space-x-2 justify-center items-center">
					<p className=" mr-1 text-xs  ">Market Statistics</p>
					<div className="text-xs w-1/4 bg-[#0C1615] p-2 rounded-2xl text-center text-white">
						No - {No}%
					</div>
					<div className="text-xs   w-1/4 bg-[#ACFF00] p-2 rounded-2xl text-center">
						Yes - {Yes}%
					</div>
				</flex>
			</div>
			<form
				onSubmit={mint}
				className="flex flex-col justify-center items-center mobile:w-full laptop:w-full"
			>
				<div className="bg-white items-center text-left  p-4   space-y-4 border-[#0C1615] w-full ">
					<did>
						<p className="font-SG text-md text-start ">
							Will the Resell Price be over ${currentMarket?.prediction}
						</p>
						<p className="font-SG text-xs text-left opacity-70 mt-2">
							Wager Expires: {expiration}
						</p>
					</did>

					<div class="bg-white items-center p-3  px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615]  dropdown dropdown-end  ">
						<label tabindex="0" class="flex items-center hover:opacity-60 ">
							<p className="text-left text-sm ">Select the Wager</p>
							<div class="flex-1"></div>
							{isYes === true ? (
								<>
									<span className="text-black">Yes</span>
								</>
							) : (
								<>
									<span className="text-black">No</span>
								</>
							)}
						</label>
						<ul
							tabindex="0"
							class="menu dropdown-content p-2 shadow bg-[#EFF1F3] rounded-box w-[25%] mt-4    "
						>
							<li className=" rounded-box ">
								<a
									onClick={() => {
										setIsYes(true);
									}}
									className="flex justify-right active:bg-[#ACFF00]"
								>
									Yes
								</a>
							</li>
							<li className=" rounded-box">
								<a
									className="flex justify-right active:bg-[#ACFF00]"
									onClick={() => {
										setIsYes(false);
									}}
								>
									No
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="bg-white items-center text-left border-b-[1px] px-4 pb-4 space-y-4 border-[#0C1615] w-full ">
					<div className="bg-white items-center p-3 px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] flex focus:outline-2 focus:outline-offset-2 hover:outline-1">
						<p className="text-left text-sm inline-block pr-1 ">Amount:</p>
						<input
							className="flex-1 text-right mobile:text-sm laptop:text-md  inline-block appearance-none focus:none focus:outline-none "
							name="Amount"
							type="number"
							placeholder="# of Contracts"
							required
						/>
					</div>
				</div>

				<div className="bg-[#ACFF00] items-center text-left  p-4 space-y-4  w-full border-b-[1px] border-b-[#0C1615]">
					<div className="font-Inter mobile:text-lg font-medium flex flex-row justify-center items-center">
						<Tooltip
							title="Price is dynamic and will adjust in response to buys/sells in the market. Buy price will always show the lowest market price."
							arrow
							className="self-start mr-2"
						>
							<InfoIcon sx={{ fontSize: '18px' }} />
						</Tooltip>
						<p className="pr-4 ">
							Price: ${isYes === true ? priceOfYes : priceOfNo} per contract{' '}
						</p>
					</div>
				</div>

				<div className="bg-white items-center text-left  p-4 space-y-4  w-full border-b-[1px] border-b-[#0C1615]">
					<button
						type="submit"
						id="mint"
						className="w-full font-medium  text-xl py-4  text-white bg-[#0C1615] rounded-[80px] hover:opacity-60"
					>
						Buy
					</button>
				</div>

				<div className="bg-[#DCDEE1] items-center text-left rounded-b-[10px] p-3  space-y-4  w-full ">
					<div className="w-full  flex px-5 items-center">
						<p className="text-left text-sm font-medium">
							Total possible winnings
						</p>
						<div className="flex-1 " />
						<p className="text-left text-sm font-medium p-2 rounded-2xl text-center bg-[#ACFF00] mobile:text-xs">
							${jackpotTotal}
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};
