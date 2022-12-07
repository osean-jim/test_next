"use client";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export default function Home() {
  const [ isMetaMaskInstalled, setIsMetaMaskInstalled ] = useState(false);
  const [ isMetaMaskConnected, setIsMetaMaskConnected ] = useState(false);




  const handleMetaMaskDisconnect = async () => {
    const isConnected = window.ethereum.isConnected();
    console.log(isConnected);
    if (isConnected) {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
    }
  }
  const handleMetaMaskConnect = () => {
    if (!isMetaMaskInstalled) {
      alert('메타마스크를 설치해야 합니다.');
    } else {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: any) => {
        // accounts[0] is the address of the currently selected account
        console.log(accounts[0], 'result data');
      }).catch((err: any) => {
        alert(err.message)
      })
    }
  }

  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        setIsMetaMaskInstalled(true);
      } else {
        console.log("Please install MetaMask!");
        setIsMetaMaskInstalled(false);
      }
    })();
  }, []);

  return (
    <>
      <div style={{ padding: 30 }}>
        <select className={'select select-bordered w-full max-w-xs'}>
          <option>메타마스크</option>
          <option>카이카스</option>
        </select>

        <button className={"btn btn-active"} onClick={handleMetaMaskConnect}>메타마스크 연결</button>
        <br />
        <button className={"btn btn-active"} onClick={handleMetaMaskDisconnect}>메타마스크 비연결</button>
      </div>
    </>
  );
};