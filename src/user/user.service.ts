// criado a partir do comando nest g service user
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // biblioteca para encriptar senhas
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // private users: UserEntity[] = []; //Usado para salvar localmente //Está sendo comentado porque o dados estão sendo salvos no banco de dados no momento

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {} //Criando o repository do usuário

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    //Encriptando a senha
    const saltOrRounds = 10;

    const passwordHashed = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    ); // função para encriptar a senha de acordo com a biblioteca do Nest

    return this.userRepository.save({
      ...createUserDto,
      typerUser: 1,
      password: passwordHashed,
    });

    // const user: UserEntity = {
    //   ...createUserDto,
    //   id: this.users.length + 1,
    //   password: passwordHashed,
    // }; // Modificando os dados do user e adicionando o ID //Está comentado porque o código acima está fazendo o processo vinculado com o banco de dados

    // this.users.push(user); //salvando o dados na memrória local (futuramente vai ser salvo em um banco de dados)

    // console.log('passwordHashed', passwordHashed);

    // //retornando o Usuário
    // return user;
  }

  // Buscando todos os usuários
  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find(); //Acessando todos os usuários
  }
}
//Observação os códigos que estão comentados foram feitos durante a aula e não foram excluídos para mostrar a evolução do código
