import React, { createContext, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import caver from "../libs/caver";

interface WalletContext {
  isMetaMaskInstalled: boolean;
  isMetaMaskConnected: boolean;
  currentMetaMaskAccount: string;
  isKaiKasInstalled: boolean;
  isKaiKasConnected: boolean;
  currentKaiKasAccount: string;
}

export const walletContext = createContext<WalletContext>({
  isMetaMaskInstalled: false,
  isMetaMaskConnected: false,
  currentMetaMaskAccount: "",
  isKaiKasInstalled: false,
  isKaiKasConnected: false,
  currentKaiKasAccount: "",
});

export const ProvideWallet = ({ children }: { children: React.ReactNode }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = React.useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = React.useState(false);
  const [currentMetaMaskAccount, setCurrentMetaMaskAccount] =
    React.useState("");
  const [isKaiKasInstalled, setIsKaiKasInstalled] = React.useState(false);
  const [isKaiKasConnected, setIsKaiKasConnected] = React.useState(false);
  const [currentKaiKasAccount, setCurrentKaiKasAccount] = React.useState("");
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    (async () => {
      setIsInitialized(false);
      console.log(caver);
      // Wallet Check
      const providerMetaMask = window.ethereum;
      const providerKaiKas = window.klaytn;
      // Case: MetaMask
      if (providerMetaMask) {
        setIsMetaMaskInstalled(true);
        console.log("MetaMask is installed!");
      }
      // Case: KaiKas
      if (providerKaiKas) {
        setIsKaiKasInstalled(true);
        console.log("KaiKas is installed!");
      }
      setIsInitialized(true);
    })();
  }, []);
  return (
    <walletContext.Provider
      value={{
        isMetaMaskInstalled,
        isMetaMaskConnected,
        currentMetaMaskAccount,
        isKaiKasInstalled,
        isKaiKasConnected,
        currentKaiKasAccount,
      }}
    >
      {!isInitialized ? <div>Loading...</div> : children}
    </walletContext.Provider>
  );
};
