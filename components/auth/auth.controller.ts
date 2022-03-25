import { Controller, Get, Param, Sse } from '@nestjs/common';
import { AuthService } from './auth.service';
import { firstValueFrom, Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user-data/:uuid')
  async getUserData(@Param() params) {
    const data = await firstValueFrom(
      await this.authService.getUserData(params.uuid),
    );
    return { data };
  }

  @Sse('sse')
  sse(): Observable<any> {
    return this.authService.auth();
  }
}
