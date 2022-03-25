import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { XummSdk } from 'xumm-sdk';

@Injectable()
export class CreateBuyService {
  
  private readonly sdk: XummSdk;

  constructor(private httpService: HttpService) {
    this.sdk = new XummSdk(
      'b3f5cf26-b26a-433a-8561-79006f7637b3',
      '7c52b237-eb38-4e85-acce-9e6960dea2e8',
    ); // TODO: change to env
  }

  async create(payload: any): Promise<any> {
    return await this.sdk.payload
      .create({
          txjson: {
            TransactionType: "NFTokenCreateOffer",
            Account: payload.account,
            Owner: payload.owner,
            TokenID: payload.tokenID,
            Amount: 1,
            Flags: 1
          }
        } as any);
  }
}
