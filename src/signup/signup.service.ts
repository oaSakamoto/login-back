import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const existingUser = await this.prisma.postgres.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já esta em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.prisma.postgres.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      message: 'Usuário registrado com sucesso'
    };
  }
}
