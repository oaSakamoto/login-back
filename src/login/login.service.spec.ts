import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('LoginService', () => {
  let loginService: LoginService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockLoginDto: LoginDto = {
    email: 'teste@exemplo.com',
    password: 'senha123',
  };

  const mockUser = {
    id: 1,
    email: 'teste@exemplo.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: PrismaService,
          useValue: {
            postgres: {
              user: {
                findUnique: jest.fn(),
              },
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  const mockFindUser = (user: typeof mockUser | null) => {
    prismaService.postgres.user.findUnique = jest.fn().mockResolvedValue(user);
  };

  const mockPasswordComparison = (isValid: boolean) => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(isValid);
  };

  const mockTokenGeneration = (token: string) => {
    jwtService.sign = jest.fn().mockReturnValue(token);
  };

  describe('login', () => {
    it('deve retornar um token de acesso para credenciais válidas', async () => {
      mockFindUser(mockUser);
      mockPasswordComparison(true);
      mockTokenGeneration('mockToken');

      const result = await loginService.login(mockLoginDto);

      expect(result).toEqual({ access_token: 'mockToken' });
      expect(prismaService.postgres.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockLoginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id, email: mockUser.email });
    });

    it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
      mockFindUser(null);

      await expect(loginService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      expect(prismaService.postgres.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockLoginDto.email },
      });
    });

    it('deve lançar UnauthorizedException se a senha for inválida', async () => {
      mockFindUser(mockUser);
      mockPasswordComparison(false);

      await expect(loginService.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      expect(prismaService.postgres.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockLoginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDto.password, mockUser.password);
    });
  });
});
