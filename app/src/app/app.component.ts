import { Component } from '@angular/core';
import { AppService } from './app.service';
declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(public appService: AppService) {
    this.checkMetamask();
    this.appService.getWalletDetails();
  }
  checkMetamask() {
    if (window.ethereum || window.web3) {
      console.log("metamask installed");
    }
    else {
      console.log("metamask not installed");
    }
    console.log(window.ethereum)
  }
  async connectWallet() {
    try {
      await window.ethereum.enable();
      this.appService.getWalletDetails();
    } catch (error) {
      console.log(error);
    }
  }

}
