import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createuser.dto';
import { SignUpService } from './signup.service';
import { SignupSwagger } from './signup.decorators';

@ApiTags('Autenticação')
@Controller('signup')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  @SignupSwagger()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.signUpService.create(createUserDto);
  }
}
