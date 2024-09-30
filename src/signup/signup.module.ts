import { Module } from "@nestjs/common";
import { SignUpController } from "./signup.controller";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SignUpController],
})

export class SignUpModule {}
