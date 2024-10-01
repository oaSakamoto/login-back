import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SignUpModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './common/auth/auth.module';
import { DashController } from './dash.controller';
import { LoggingService } from './common/logging/logging.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { LoggingMiddleware } from './common/logging/logging.middleware';

@Module({
  providers: [LoggingService],
  imports: [SignUpModule, LoginModule, AuthModule, PrismaModule],
  controllers: [DashController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .exclude({path: 'api', method: RequestMethod.ALL})
      .forRoutes('*')
  }
}
