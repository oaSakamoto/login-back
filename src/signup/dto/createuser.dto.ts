import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { PasswordMatch } from '../../common/decorators/validation/password-match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'João Silva',
    minLength: 2,
    maxLength: 50,
  })

  
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caractéres' })
  @MaxLength(50, { message: 'Nome deve ter no máximo 50 caractéres' })
  name: string;

  @ApiProperty({
    description: 'O endereço de e-mail do usuário',
    example: 'joao.silva@exemplo.com',
    maxLength: 255,
  })
  
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(250, { message: 'Email deve ter no máximo 250 caracteres' })
  email: string;

  @ApiProperty({
    description: 'A senha para a conta do usuário',
    example: 'senhaF0rte@',
    minLength: 8,
    maxLength: 50,
  })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(50, { message: 'Senha deve ter no máximo 50 caracteres' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;


  @ApiProperty({
    description: 'Confirmação da senha',
    example: 'senhaF0rte@',
  })
  @ApiProperty()
  @PasswordMatch('password', { message: 'As senhas não coincidem' })
  @IsNotEmpty({ message: 'Confirmação de senha não pode ser vazia' })
  passwordConfirmation: string;
}
