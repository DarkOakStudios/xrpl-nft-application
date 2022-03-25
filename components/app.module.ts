import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MintModule } from './mint/mint.module';
import { CreateBuyModule } from './create-buy/create-buy.module';
import { BuyModule } from './buy/buy.module';
import { MetadataMergerService } from '../common/metadata-merger/metadata-merger.service';

@Module({
  imports: [AuthModule, MintModule, CreateBuyModule, BuyModule],
  controllers: [AppController, AuthController],
  providers: [AppService, MetadataMergerService],
})
export class AppModule {}
