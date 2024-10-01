import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  const mockLoginDto: LoginDto = {
    email: 'usuario@exemplo.com',
    password: 'senha123',
  };

  const mockLoginResponse = {
    access_token: 'mock_token_12345',
  };

  beforeEach(async () => {
    const mockLoginService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  describe('login', () => {
    it('deve chamar loginService.login com o DTO correto', async () => {
      jest.spyOn(loginService, 'login').mockResolvedValue(mockLoginResponse);

      await loginController.login(mockLoginDto);

      expect(loginService.login).toHaveBeenCalledWith(mockLoginDto);
    });

    it('deve retornar o access_token quando o login for bem-sucedido', async () => {
      jest.spyOn(loginService, 'login').mockResolvedValue(mockLoginResponse);

      const result = await loginController.login(mockLoginDto);

      expect(result).toEqual(mockLoginResponse);
    });

    it('deve lançar UnauthorizedException quando as credenciais forem inválidas', async () => {
      jest.spyOn(loginService, 'login').mockRejectedValue(new UnauthorizedException('Credenciais inválidas'));

      await expect(loginController.login(mockLoginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
