import { Controller, Get, Param, Sse } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { MintService } from './mint.service';

@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Get('/token-data/:uuid')
  async getUserData(@Param() params) {
    console.log(params.uuid)
    const data = await firstValueFrom(
      await this.mintService.getTokenData(params.uuid),
    );
    return { data };
  }

  @Sse('sse/:account')
  sse(@Param() parameter): Observable<any> {
    return this.mintService.mint(parameter.account);
  }
}
