import { Injectable } from "@angular/core";
import { create } from 'ipfs-http-client'

@Injectable()
export class IpfsService {
  constructor() { }
  upload(fileBuffer) {
    const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
    client.add(fileBuffer).then(data => {
      console.log(data.cid.toString());
      console.log(data.path);
      console.log(data.path);
    });
  }
}