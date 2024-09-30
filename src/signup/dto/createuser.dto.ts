import { IsEmail, IsNotEmpty , MinLength, MaxLength, IsString} from 'class-validator';
import { PasswordMatch } from '../../common/decorators/validation/password-match.decorator';

export class CreateUserDto {
  @IsNotEmpty({message: 'Nome não pode ser vazio'})
  @IsString({message: 'Nome deve ser uma string'})
  @MinLength(2, {message: 'Nome deve ter no mínimo 2 caractéres'})
  @MaxLength(50, {message: 'Nome deve ter no máximo 50 caractéres'})
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({},{ message: 'Email inválido' })
  @MaxLength(250, {message: 'Email deve ter no máximo 250 caracteres'})
  email: string;

  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(50, { message: 'Senha deve ter no máximo 50 caracteres' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;

  @PasswordMatch('password',{ message: 'As senhas não coincidem' })
  @IsNotEmpty({ message: 'Confirmação de senha não pode ser vazia' })
  passwordConfirmation: string;
}
