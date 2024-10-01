import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { LoginSwagger } from "./login.decorators";
import { LoginDto } from "./dto/login.dto";

@ApiTags('Autenticação')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @LoginSwagger()
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto)
  }
}
