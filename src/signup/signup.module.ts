import { Module } from "@nestjs/common";
import { SignUpController } from "./signup.controller";

@Module({
  controllers: [SignUpController],
})

export class SignUpModule {}
