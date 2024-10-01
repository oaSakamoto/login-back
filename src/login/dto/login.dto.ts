import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
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
}
