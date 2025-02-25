import { IsString } from 'class-validator';

//Criando a interface dos dados de acordo com o design do Banco de Dados
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
