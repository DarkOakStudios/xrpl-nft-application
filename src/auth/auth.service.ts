import { Injectable } from '@nestjs/common';
import { XummSdk } from 'xumm-sdk'
import { fromEvent, Subject } from "rxjs";
import { EventEmitter } from "events";


import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {

  private readonly sdk: XummSdk;
  private emitter = new Subject();

  constructor() {
    this.sdk = new XummSdk('b3f5cf26-b26a-433a-8561-79006f7637b3', '7c52b237-eb38-4e85-acce-9e6960dea2e8'); // TODO: change to env
  }

  auth(): Subject<any> {
      this.sdk.payload.createAndSubscribe({
        custom_meta: {
          instruction: 'Hello! Please sign!'
        },
        txjson: {
          'TransactionType': 'SignIn'
        }
      }, event => {
        this.emitter.next(JSON.stringify(event.data));
      }).then(result => {
        this.emitter.next(result.created.next.always);
      })
      return this.emitter;
  }
}
