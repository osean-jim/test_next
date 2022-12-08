"use client";
import { useContext } from "react";
import { walletContext } from "./rootContext";

type WalletList = "MetaMask" | "KaiKas";

export default function Home() {
  const {
    isMetaMaskInstalled,
    isMetaMaskConnected,
    isKaiKasInstalled,
    isKaiKasConnected,
    setSelectedWallet,
    selectedWallet,
  } = useContext(walletContext);
  const walletMap = {
    MetaMask: {
      connect: async () => {
        if (typeof window.ethereum !== "undefined") {
          setSelectedWallet("MetaMask");
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          console.log(account);
        }
      },
    },
    KaiKas: {
      connect: async () => {
        if (typeof window.klaytn !== "undefined") {
          setSelectedWallet("KaiKas");
          const accounts = await window.klaytn.request({
            method: "klay_accounts",
          });
          const account = accounts[0];
          console.log(account);
        }
      },
    },
  };
  const handleWalletChange = (value: WalletList) => {
    walletMap[value].connect();
  };

  const handleMetaMaskConnect = () => {
    if (typeof window.ethereum !== "undefined") {
      console.log(window.ethereum);
    }
    // 메타마스크 접속 시도
    // if (typeof window.ethereum !== "undefined") {
    //   console.log(window.ethereum, "Hello MetaMask");
    //   if (!isMetaMaskInstalled) {
    //     alert("메타마스크를 설치해야 합니다.");
    //   } else {
    //     window.ethereum
    //       .request({ method: "eth_requestAccounts" })
    //       .then((accounts: any) => {
    //         // accounts[0] is the address of the currently selected account
    //         console.log(accounts[0], "result data");
    //       })
    //       .catch((err: any) => {
    //         alert(err.message);
    //       });
    //   }
    // }
  };
  const handleKaiKasConnect = () => {
    // 카이카스 접속 시도
  };

  return (
    <>
      <div className={'p-20 bg-amber-600'}>
        { selectedWallet}
        <ul className={'menu bg-base-100 w-56 rounded-box'}>
          <li>
            <a onClick={() => walletMap['MetaMask'].connect()}>
              MetaMask
            </a>
          </li>
          <li>
            <a onClick={() => walletMap['KaiKas'].connect()}>
              KaiKas
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
