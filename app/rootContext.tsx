import React, { createContext, useEffect } from "react";

interface WalletContext {
  selectedWallet: string;
  setSelectedWallet: React.Dispatch<React.SetStateAction<string>>;
  isMetaMaskInstalled: boolean;
  isMetaMaskConnected: boolean;
  currentMetaMaskAccount: string;
  isKaiKasInstalled: boolean;
  isKaiKasConnected: boolean;
  currentKaiKasAccount: string;
}

export const walletContext = createContext<WalletContext>({
  selectedWallet: "",
  setSelectedWallet: () => {},
  isMetaMaskInstalled: false,
  isMetaMaskConnected: false,
  currentMetaMaskAccount: "",
  isKaiKasInstalled: false,
  isKaiKasConnected: false,
  currentKaiKasAccount: "",
});

export const ProvideWallet = ({ children }: { children: React.ReactNode }) => {
  const [selectedWallet, setSelectedWallet] = React.useState("");
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = React.useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = React.useState(false);
  const [currentMetaMaskAccount, setCurrentMetaMaskAccount] =
    React.useState("");
  const [isKaiKasInstalled, setIsKaiKasInstalled] = React.useState(false);
  const [isKaiKasConnected, setIsKaiKasConnected] = React.useState(false);
  const [currentKaiKasAccount, setCurrentKaiKasAccount] = React.useState("");

  const providerMetaMask = window.ethereum;
  const providerKaiKas = window.klaytn

  // MetaMask
  useEffect(() => {
    // MetaMask 설치여부 확인

    if (providerMetaMask) {
      setIsMetaMaskInstalled(true);
    }
  }, []);

  useEffect(() => {
    // MetaMask 계정 변경
  }, []);

  // KaiKas
  useEffect(() => {
    // KaiKas 설치여부 확인
    if (providerKaiKas) {
      console.log(providerKaiKas);
      setIsKaiKasInstalled(true);
    }
  }, []);

  // useEffect(() => {
  //
  // },[])

  return (
    <walletContext.Provider
      value={{
        selectedWallet,
        setSelectedWallet,
        isMetaMaskInstalled,
        isMetaMaskConnected,
        currentMetaMaskAccount,
        isKaiKasInstalled,
        isKaiKasConnected,
        currentKaiKasAccount,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};
