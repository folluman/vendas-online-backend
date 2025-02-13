//Criando a interface dos dados de acordo com o design do Banco de Dados
export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}
