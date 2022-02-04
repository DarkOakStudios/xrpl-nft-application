import { Controller, Get, Sse, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { map, Observable, interval } from 'rxjs';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  @Sse('sse')
  sse(): Observable<any> {
    return this.authService.auth()
  }
}
