import { Body, Controller, Post } from '@nestjs/common';
import { CreateBuyService } from './create-buy.service';

@Controller('create-buy')
export class CreateBuyController {
  constructor(private readonly createBuyService: CreateBuyService) {}

  @Post()
  async createBuyOffer(@Body() createOfferDto: any) {
    const createOfferResult = await this.createBuyService.create(createOfferDto);
    console.log(createOfferResult);
    return createOfferResult;
  }

}
