import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      synchronize: true, // Utilizado para criar automaticamente a tabela no banco de dados, porém não é ideal de se utilizar o melhor é deixar como false. Vai ser utilizado somente para teste
      entities: [`${__dirname}/**/*.entity{.js,.ts}`], //Procura todos os arquivos que possuem .entity.js ou entity.ts //Serve para que não precise ficar colocando arquivo por arquivo das entidades
    }),
    UserModule,
  ],
})
export class AppModule {}
