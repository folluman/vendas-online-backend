import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Post()
  async getAllUsers(@Body() createUser: CreateUserDto) {
    return {
      ...createUser,
      password: undefined, //Passando o password como vazio nos teste do postman
    };
  }
}
