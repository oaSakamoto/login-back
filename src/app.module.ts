import { Module } from '@nestjs/common';
import { SignUpModule } from './signup/signup.module';

@Module({
  imports: [SignUpModule],
})
export class AppModule {}
