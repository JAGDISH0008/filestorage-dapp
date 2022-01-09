import { Injectable } from "@angular/core";
import { ethers } from "ethers";
declare const window: any;

@Injectable()
export class AppService {
  accounts: string[] = [];
  balance: string;
  constructor() {
  }
  async getWalletDetails() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.accounts = await provider.listAccounts();
    if (this.accounts.length > 0) {
      let balanceObj = await provider.getBalance(this.accounts[0]);
      this.balance = ethers.utils.formatEther(balanceObj);
    }

    console.log(provider);
    console.log(this.accounts);
    console.log(this.balance);

  }
}