import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,  
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
})
export class LoginModule {}

