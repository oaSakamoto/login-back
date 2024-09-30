import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { Request } from 'express';

@Controller('signup')
export class SignUpController {
  @Post()
  create(@Body() createSignUpDto: CreateUserDto, @Req() request : Request) {
    console.log(request)
  }
}
