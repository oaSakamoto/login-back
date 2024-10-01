import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../common/prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const {email , password} = loginDto;

    const user = await this.prisma.postgres.user.findUnique({
      where: {email},
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
