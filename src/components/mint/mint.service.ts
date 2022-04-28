import { Injectable } from '@nestjs/common';
import { XummSdk } from 'xumm-sdk';
import { Subject, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as xrpl from 'xrpl';

@Injectable()
export class MintService {
  private readonly sdk: XummSdk;
  private emitter = new Subject();

  constructor(private httpService: HttpService) {
    this.sdk = new XummSdk(process.env.API_KEY, process.env.API_SECRET);
  }

  async getTokenData(uuid: string) {
    return this.httpService
      .get(`https://xumm.app/api/v1/platform/payload/${uuid}`, {
        headers: {
          'X-API-Key': process.env.API_KEY,
          'X-API-Secret': process.env.API_SECRET,
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  mint(account: string, URIraw: string) {
    const URI = xrpl.convertStringToHex(URIraw);
    return this.sdk.payload.create(
      // .createAndSubscribe(
        {
          txjson: {
            TransactionType: 'NFTokenMint',
            Account: account,
            TokenTaxon: 0,
            URI,
          },
        }
        // (event) => {
        //   this.emitter.next(JSON.stringify(event.data));
        // },
      )
      // .then((result) => {
      //   this.emitter.next(result.created.next.always);
      // });
    // return this.emitter;
  }
}
