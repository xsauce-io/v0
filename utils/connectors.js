import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

//TODO: CHANGE SUPPORTED CHAINED
const injected = new InjectedConnector({ supportedChainIds: [1, 2, 3, 42] });

const walletConnect = new WalletConnectConnector({
    rcpUrl: "",
    bridge: "",
    qrcode: true,
})

const walletLink = new WalletLinkConnector(({
    url: "",
    appName: "Xsauce-V0"
}))

export const connectors = {
    injected: injected,
    walletConnect: walletConnect,
    coinbaseWallet:walletLink
}