import { Injectable } from '@nestjs/common';
import { XummSdk } from 'xumm-sdk';
import { Subject, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MintService {
  private readonly sdk: XummSdk;
  private emitter = new Subject();

  constructor(private httpService: HttpService) {
    this.sdk = new XummSdk(
      'b3f5cf26-b26a-433a-8561-79006f7637b3',
      '7c52b237-eb38-4e85-acce-9e6960dea2e8',
    ); // TODO: change to env
  }

  async getTokenData(uuid: string) {
    return this.httpService
      .get(`https://xumm.app/api/v1/platform/payload/${uuid}`, {
        headers: {
          'X-API-Key': 'b3f5cf26-b26a-433a-8561-79006f7637b3',
          'X-API-Secret': '7c52b237-eb38-4e85-acce-9e6960dea2e8',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  mint(account: string): Subject<any> {
    this.sdk.payload
      .createAndSubscribe(
        {
          txjson: {
            TransactionType: 'NFTokenMint',
            Account: account,
            TokenTaxon: 0,
          },
        } as any,
        (event) => {
          // console.log(JSON.stringify(event.data));
          this.emitter.next(JSON.stringify(event.data));
        },
      )
      .then((result) => {
        // console.log(JSON.stringify(result.created.next.always));
        this.emitter.next(result.created.next.always);
      });
    return this.emitter;
  }
}
