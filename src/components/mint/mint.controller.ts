import { Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { MetadataDTO } from '../combine-metadata/DTO/metadata.dto';
import { MintService } from './mint.service';

@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Get('/token-data/:uuid')
  async getUserData(@Param() params) {
    console.log(params.uuid);
    const data = await firstValueFrom(
      await this.mintService.getTokenData(params.uuid),
    );
    return { data };
  }

  @Sse('sse/:account')
  sse(@Param() parameters): Observable<any> {
    return this.mintService.mint(parameters.account, parameters.URI);
  }
}
