import { Component } from '@angular/core';
import { AppService } from './app.service';
import { create } from 'ipfs-http-client'
import { ToastrService } from 'ngx-toastr';
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
