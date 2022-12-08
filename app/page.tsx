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
  } = useContext(walletContext);
  const walletMap = {
    MetaMask: {
      connect: () => {
        if (typeof window.ethereum !== "undefined") {
          console.log("MetaMask Connect");
        }
      },
    },
    KaiKas: {
      connect: () => {
        if (typeof window.klaytn !== "undefined") {
          window.klyatn.enable();
          console.log("KaiKas Connect");
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
      <div style={{ padding: 30 }}>
        <p>
          {isMetaMaskInstalled
            ? "MetaMask Installed"
            : "MetaMask Not Installed"}
        </p>
        <p>{isKaiKasInstalled ? "KaiKas Installed" : "KaiKas Not Installed"}</p>
        <select
          className={"select select-bordered w-full max-w-xs"}
          onChange={(e) => handleWalletChange(e.target.value as WalletList)}
        >
          <option value={"MetaMask"}>메타마스크</option>
          <option value={"KaiKas"}>카이카스</option>
        </select>
      </div>
    </>
  );
}
