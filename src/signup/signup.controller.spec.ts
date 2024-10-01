import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';
import { CreateUserDto } from './dto/createuser.dto';
import { HttpStatus } from '@nestjs/common';

describe('SignUpController', () => {
  let controller: SignUpController;
  let service: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        {
          provide: SignUpService,
          useValue: {
            create: jest.fn().mockResolvedValue({ message: 'Usuário registrado com sucesso' }),
          },
        },
      ],
    }).compile();

    controller = module.get<SignUpController>(SignUpController);
    service = module.get<SignUpService>(SignUpService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call SignUpService.create and return Created status', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({ message: 'Usuário registrado com sucesso' });
    });

    it('should have @HttpCode(HttpStatus.CREATED) decorator', () => {
      const createMethod = controller.create;
      const metadata = Reflect.getMetadata('__httpCode__', createMethod);
      expect(metadata).toBe(HttpStatus.CREATED);
    });
  });
});
