import { MetaMaskInpageProvider } from '@metamask/inpage-provider';

// Next.js에서 next-env.d.ts는 수정 불가. 따로 만들어서 사용해야 함.

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}