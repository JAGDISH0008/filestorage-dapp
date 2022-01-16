import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import Identicon from "identicon.js";
declare const window: any;

@Injectable()
export class AppService {
  accounts: string[] = [];
  balance: string;
  imageData;
  constructor() {
  }
  async getWalletDetails() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.accounts = await provider.listAccounts();
    if (this.accounts.length > 0) {
      let balanceObj = await provider.getBalance(this.accounts[0]);
      this.balance = ethers.utils.formatEther(balanceObj);
      this.imageData = new Identicon(this.accounts[0], 30).toString();
      this.imageData = "data:image/png;base64," + this.imageData;
    }
  }
}