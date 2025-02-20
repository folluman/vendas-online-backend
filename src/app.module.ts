import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

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
      // synchronize: true, // Utilizado para criar automaticamente a tabela no banco de dados, porém não é ideal de se utilizar o melhor é deixar como false. Vai ser utilizado somente para teste // código comentado pois foi criado o migration
      entities: [`${__dirname}/**/*.entity{.js,.ts}`], //Procura todos os arquivos que possuem .entity.js ou entity.ts //Serve para que não precise ficar colocando arquivo por arquivo das entidades
      migrations: [`${__dirname}/migration/{.ts,*.js}`], //Procura os arquivos de migration que vai ser utilizado no lugar do synchronize
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
  ],
})
export class AppModule {}
