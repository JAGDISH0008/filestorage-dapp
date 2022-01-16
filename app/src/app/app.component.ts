import { Component } from '@angular/core';
import { AppService } from './app.service';
import { create } from 'ipfs-http-client'
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../utils/util';
declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;
  title = 'app';
  public fileBuffer: any;
  public utils = new Utils();
  constructor(
    public appService: AppService,
    private toastrService: ToastrService
  ) {
    this.init();
  }
  init() {
    if (typeof window.ethereum == 'undefined') {
      this.toastrService.info('Please install Metamask to continue');
    }
    else {
      this.fetchDetails();
    }
  }
  async connectWallet() {
    this.loading = true;
    try {
      await window.ethereum.enable();
      this.fetchDetails();
      this.loading = false;
      this.toastrService.success("Connected to Metamask");
    } catch (error) {
      this.loading = false;
      this.toastrService.error("Error connecting to Metamask");

    }
  }

  fetchDetails() {
    this.loading = true;
    this.appService.getWalletDetails().then(() => {
      if (this.appService.network?.chainId != 4) {
        this.toastrService.info('Please switch to Rinkeby test network');
      }
      this.loading = false;
    });
  }

  upload() {
    const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
    client.add(this.fileBuffer).then(data => {
      console.log(data.cid.toString());
      console.log(data.path);
      console.log(data.path);
    });
  }

  async handleFileInput(files: FileList) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = (e) => {
      this.fileBuffer = Buffer.from(reader.result);
    }
  }

}
