import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { SignUpModule } from './signup/signup.module';

@Module({
  imports: [SignUpModule],
})
export class AppModule {}
