/*
 * File: auth.controller.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:16:50 am
 * Last Modified: Saturday, October 17th 2026, 5:17:26 pm
 * Copyright © 2026 AMDE Agência
 */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  public signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  public signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
