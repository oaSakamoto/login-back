import { ApiBodyOptions, ApiResponseOptions } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";


export const LoginSwaggerDocs = {
  apiOperation: {
    summary: 'Autentica o usuário',
    description: 'Autentica o usuário com as informações fornecidas',
  },
  apiBody: {
    type: LoginDto,
    description: 'Dados do usuário para autenticação',
    examples: {
      loginExample: {
        summary: 'Exemplo de requisição de login de usuário',
        value: {
          email: 'joao.silva@example.com',
          password: 'S3nh@F0rte!',
        }
      }
    }
  } as ApiBodyOptions,
  apiResponses : {
    logged: {
      status: 201,
      description: 'Usuário logado com sucesso.',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Usuário logado com sucesso' },
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
              'Email inválido',
              'Senha deve ter no mínimo 8 caracteres',
            ],
            error: 'Bad Request'
          }
        }
      } 
    } as ApiResponseOptions,
  }
}

   
   

