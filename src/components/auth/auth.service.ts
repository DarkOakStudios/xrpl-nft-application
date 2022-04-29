import { Injectable } from '@nestjs/common';
import { XummPostPayloadResponse } from 'xumm-sdk/dist/src/types';
import { XummSdk } from 'xumm-sdk';
import { Subject, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  private readonly sdk: XummSdk;
  private emitter = new Subject();

  constructor(private httpService: HttpService) {
    this.sdk = new XummSdk(
      'b3f5cf26-b26a-433a-8561-79006f7637b3',
      '7c52b237-eb38-4e85-acce-9e6960dea2e8',
    ); // TODO: change to env
  }

  async getUserData(uuid: string) {
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

  auth(): Promise<XummPostPayloadResponse> {
    return this.sdk.payload.create(
      // .createAndSubscribe(
        {
          custom_meta: {
            instruction: 'Hello! Please sign!',
          },
          txjson: {
            TransactionType: 'SignIn',
          },
        },
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
