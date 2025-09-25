import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthLoginDTO } from './domain/dto/authLogin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { CreateUserDTO } from '../users/domain/dto/createUser.dto';
import { AuthRegister } from './domain/dto/authRegister.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async generateJwtToken(user: User) {
    const payload = { sub: user.id, name: user.name };
    const options = {
      expiresIn: '1d',
      issuer: 'dnc_hotel',
      audience: 'users',
    };
    return { access_token: this.jwtService.sign(payload, options) };
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.userService.findByEmail(email);

    if (!user || (await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return await this.generateJwtToken(user);
  }

  async register(body: AuthRegister) {
    if (!body.email || !body.name || !body.password) {
      throw new BadRequestException('Email, name and password are required!');
    }

    const newUser: CreateUserDTO = {
      email: body.email,
      name: body.name,
      password: body.password,
      role: body.role ?? 'USER',
    };

    const user = await this.userService.create(newUser);

    return await this.generateJwtToken(user);
  }
}
