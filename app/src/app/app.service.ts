import { environment } from './../environments/environment';
import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import Identicon from "identicon.js";
import { abi } from "./abi/contract_abi";
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

  uploadToContract(hash, name, size, type, description) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.accounts[0]);
    let contract = new ethers.Contract(environment.address, abi.abi, signer);
    return contract.functions.uploadFile(hash, name, size, type, description)
  }
  getMyFiles() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.accounts[0]));
    return contract.functions.getMyFiles();
  }

  getMyFileCount() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.accounts[0]));
    return contract.functions.getMyFilesCount();

  }

}