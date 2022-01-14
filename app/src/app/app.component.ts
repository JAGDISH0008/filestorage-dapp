import { Component } from '@angular/core';
import { AppService } from './app.service';
import { create } from 'ipfs-http-client'
declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;
  title = 'app';
  constructor(public appService: AppService) {
    this.checkMetamask();
    this.fetchDetails();
    this.addFiles();
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
    this.loading = true;
    try {
      await window.ethereum.enable();
      this.fetchDetails();
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }
  fetchDetails() {
    this.loading = true;
    this.appService.getWalletDetails().then(() => {
      this.loading = false;
    });
  }
  async addFiles() {
    const client = create({ url: "http://localhost:5001/api/v0" });
    client.add({
      path: "test.txt",
      content: "This is test file"
    }).then(data => {
      console.log(data.cid.toString());
      console.log(data.path);
      console.log(data.path);
    });

  }

}
