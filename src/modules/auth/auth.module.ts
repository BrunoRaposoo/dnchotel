import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JTW_SECRET,
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
