import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserReposility } from './auth.reposility';
import { AuthCredentialDto } from './dto/auth-credientials.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserReposility)
    private userResility: UserReposility,
    private jwtservice: JwtService,
  ) {}
  async signUp(authenCredentialDto: AuthCredentialDto): Promise<void> {
    this.userResility.createUser(authenCredentialDto);
  }
  async signIn(
    authenCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authenCredentialDto;
    const user = await this.userResility.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtservice.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
