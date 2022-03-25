import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CreateBuyController } from './create-buy.controller';
import { CreateBuyService } from './create-buy.service';

@Module({
  imports: [HttpModule],
  providers: [CreateBuyService],
  controllers: [CreateBuyController],
  exports: [CreateBuyService],
})
export class CreateBuyModule {}
