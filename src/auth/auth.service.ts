import { Injectable } from '@nestjs/common';
import { XummSdk } from 'xumm-sdk'
import { fromEvent } from "rxjs";
import { EventEmitter } from "events";


import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {

  private readonly sdk: XummSdk;
  private readonly emitter: EventEmitter;

  constructor() {
    this.sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET);
    this.emitter = new EventEmitter();
  }

  authSubscription() {
    return fromEvent(this.emitter, 'auth');
  }

  async auth() {
      await this.sdk.payload.createAndSubscribe({
        custom_meta: {
          instruction: 'Hello! Please sign!'
        },
        txjson: {
          'TransactionType': 'SignIn'
        }
      }, event => {
        this.emitter.emit('auth', event.data);
      }).then(result => {
        this.emitter.emit('auth', result.created.next.always);
      });
  }
}
