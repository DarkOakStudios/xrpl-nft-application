import { Controller, Get, Sse, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { map } from 'rxjs';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get()
  index(@Res() response: Response) {
    this.authService.auth();
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('auth')
  sse() {
    return this.authService.authSubscription().pipe(map((data) => ({ data } as MessageEvent)))
  }
}
