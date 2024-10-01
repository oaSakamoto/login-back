import { Test, TestingModule } from '@nestjs/testing';
import { SignUpService } from './signup.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from './dto/createuser.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('SignUpService', () => {
  let service: SignUpService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    postgres: {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: CreateUserDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    passwordConfirmation: 'password123',
  };

  describe('create', () => {
    it('deve criar um novo usário com sucesso', async () => {
      mockPrismaService.postgres.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const result = await service.create(mockUser);

      expect(mockPrismaService.postgres.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(mockPrismaService.postgres.user.create).toHaveBeenCalledWith({
        data: {
          name: mockUser.name,
          email: mockUser.email,
          password: 'hashedPassword',
        },
      });
      expect(result).toEqual({ message: 'Usuário registrado com sucesso' });
    });

    it('deve lançar ConflictException quando email já está em uso', async () => {
      mockPrismaService.postgres.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(service.create(mockUser)).rejects.toThrow(ConflictException);
      
      expect(mockPrismaService.postgres.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(mockPrismaService.postgres.user.create).not.toHaveBeenCalled();
    });

    it('não deve incluir passwordConfirmation ao criar o usuário', async () => {
      mockPrismaService.postgres.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      await service.create(mockUser);

      expect(mockPrismaService.postgres.user.create).toHaveBeenCalledWith({
        data: expect.not.objectContaining({
          passwordConfirmation: expect.anything(),
        }),
      });
    });
  });
});
