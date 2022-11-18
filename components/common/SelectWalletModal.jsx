import { Image } from "@chakra-ui/react";
import { SettingsPowerRounded } from "@mui/icons-material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { connectors } from "../../utils/connectors";

  export function SelectWalletModal({ isOpen, closeModal}) {
    const { activate } = useWeb3React();
    const [network, setNetwork] = useState(false);

    // --------------Functions ------------------
    const setProvider = (type) => {
      window.localStorage.setItem("provider", type);
    };

    return (
      <>
        {isOpen
         ?
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
          <div className="w-full h-full bg-black opacity-50 absolute" onClick={closeModal}  />
          <div className="w-[300px] bg-white text-black top-0 relative p-6 rounded-3xl" w="300px" >
            <div className="flex flex-row space-x-2 pb-4 ">
              <text className="text-xl flex-1">Select Wallet</text>
                <button className="w-5 h-5  justify-self-end" onClick={closeModal}>
                  <Image alt="close" src="/xClose.svg" fill={'cover'} />
                </button>
            </div>

            <div paddingBottom="1.5rem">
              <div className="flex flex-col w-full space-y-2">
                <button
                  className="bg-[#EFF1F3] p-3 rounded-3xl hover:opacity-60"
                  onClick={ () => {
                    activate(connectors.coinbaseWallet);
                    setProvider("coinbaseWallet");
                    closeModal();
                  }}

                >
                  <div className="flex flex-row w-full px-5 justify-start space-x-2 w-full "  >
                    <Image
                      src="/coinbasewallet-icon.png"
                      alt="Coinbase Wallet Logo"
                      width={25}
                      height={25}
                      borderRadius="3px"
                    />
                    <text>Coinbase Wallet</text>
                  </div>
                </button>
                <button
                  className="bg-[#EFF1F3] p-3 rounded-3xl hover:opacity-60"
                  onClick={() => {
                    activate(connectors.walletConnect);
                    setProvider("walletConnect");

                    closeModal();
                  }}
                >
                  <div className="flex flex-row w-full px-5 justify-start space-x-2 w-full"  >
                    <Image
                      src="/wallet-connect-icon.png"
                      alt="Wallet Connect Logo"
                      width={26}
                      height={26}
                      borderRadius="3px"
                    />
                    <text>Wallet Connect</text>
                  </div>
                </button>
                <button
                  className="bg-[#EFF1F3] p-3 rounded-3xl hover:opacity-60"
                  onClick={() => {
                     activate(connectors.injected);
                    setProvider("injected");
                    closeModal();
                  }}
                >
                  <div className="flex flex-row w-full px-5 justify-start space-x-2  w-full"  >
                    <Image
                      src="/metamask-icon.png"
                      alt="Metamask Logo"
                      width={25}
                      height={25}
                      borderRadius="3px"
                    />
                    <text>Metamask</text>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div> : <></>}
      </>

    );
  }
