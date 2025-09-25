import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
})
export class AppModule {}
