import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../utils/util';
import { IpfsService } from './ipfs.service';
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
  public description: string = "";
  myFiles: any[] = [];
  constructor(
    public appService: AppService,
    private toastrService: ToastrService,
    private ipfsService: IpfsService
  ) {
    this.init();
  }
  init() {
    if (typeof window.ethereum == 'undefined') {
      this.toastrService.info('Please install Metamask to continue');
    }
    else {
      this.fetchDetails();
      // this.getFiles();
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
      if (this.appService.network?.chainId != environment.chainId) {
        this.toastrService.info('Please switch to Rinkeby test network');
      }
      this.loading = false;
    });
  }

  async upload() {
    let ipfsData = await this.ipfsService.upload(this.fileBuffer);
    this.toastrService.success("File uploaded successfully to IPFS");
    this.appService.uploadToContract(ipfsData.cid.toString(), 'test.txt', ipfsData.size, 'text/plain', this.description).then(data => {
      console.log(data);
      this.toastrService.success("Saved Hash to contract");
    }).catch(err => {
      this.toastrService.error("Error saving hash to contract");
    }).finally(() => {
      this.description = "";
      this.getFiles();
    })
  }
  getFiles() {
    this.loading = true;
    this.appService.getMyFiles().then(data => {
      this.myFiles = data[0];
      this.loading = false;
    })
  }

  async handleFileInput(files: FileList) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = (e) => {
      this.fileBuffer = Buffer.from(reader.result);
    }
  }

}
