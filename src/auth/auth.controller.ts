import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credientials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  SignUp(@Body() authCredientDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredientDto);
  }
  @Post('/signin')
  SignIn(
    @Body() authCredientDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredientDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req: Request) {
  //   console.log(req);
  // }
}
