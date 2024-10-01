import { ApiBodyOptions, ApiResponseOptions } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createuser.dto';

export const SignupSwaggerDocs = {
  apiOperation: {
    summary: 'Registrar novo usuário',
    description: 'Cria uma nova conta de usuário com as informações fornecidas.',
  },
  apiBody: {
    type: CreateUserDto,
    description: 'Dados do usuário para registro',
    examples: {
      userExample: {
        summary: 'Exemplo de requisição de registro de usuário',
        value: {
          name: 'João Silva',
          email: 'joao.silva@example.com',
          password: 'S3nh@F0rte!',
          passwordConfirmation: 'S3nh@F0rte!'
        }
      }
    }
  } as ApiBodyOptions,
  apiResponses: {
    created: {
      status: 201,
      description: 'Usuário registrado com sucesso.',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Usuário registrado com sucesso' },
        }
      }
    } as ApiResponseOptions,
    badRequest: {
      status: 400,
      description: 'Dados inválidos',
      content: {
        'application/json': {
          example: {
            statusCode: 400,
            message: [
              'Nome não pode ser vazio',
              'Nome deve ter no mínimo 2 caracteres',
              'Email inválido',
              'Senha deve ter no mínimo 8 caracteres',
              'As senhas não coincidem'
            ],
            error: 'Bad Request'
          }
        }
      }
    } as ApiResponseOptions,
    conflict: {
      status: 409,
      description: 'Conflito - Email já está em uso',
      content: {
        'application/json': {
          example: {
            statusCode: 409,
            message: 'Email já está em uso',
            error: 'Conflict'
          }
        }
      }
    } as ApiResponseOptions,
  }
};
