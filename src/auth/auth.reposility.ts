import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credientials.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserReposility extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(payload: AuthCredentialDto): Promise<void> {
    const { username, password } = payload;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
