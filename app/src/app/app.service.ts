import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import Identicon from "identicon.js";
declare const window: any;

@Injectable()
export class AppService {
  accounts: string[] = [];
  balance: number;
  network: ethers.providers.Network;
  imageData;
  constructor() {
  }
  async getWalletDetails() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.accounts = await provider.listAccounts();
    this.network = await provider.getNetwork();

    if (this.accounts?.length > 0) {
      let balanceObj = await provider.getBalance(this.accounts[0]);
      this.balance = Number(parseFloat(ethers.utils.formatEther(balanceObj)).toFixed(3));
      this.imageData = new Identicon(this.accounts[0], 30).toString();
      this.imageData = "data:image/png;base64," + this.imageData;
    }
  }
  switchNetwork() {
    if (this.network.chainId != 4) {
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            "chainId": "0X4"
          }
        ]
      })
    }
  }
}