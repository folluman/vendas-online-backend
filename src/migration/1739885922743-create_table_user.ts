//Migration é um script de banco de dados que vai ser executado antes do banco de dados ser rodado. Vai ser utilizado no lugar do synchronize
//comando para criar o migraiton npx typeorm migration:create pastaQueVaiSerCriado (no caso ele está na pasta ./src/migration/create_table_user)

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1739885922743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.user (
            id integer NOT NULL,
            name character varying NOT NULL,
            email character varying NOT NULL,
            cpf character varying NOT NULL,
            type_user int NOT NULL,
            phone character varying NOT NULL,
            password character varying NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id)
);

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;

ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);

        `); // O up é utilizado para criar alguma tabela
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.user;
        `); // o down é utilizado para reverter o que foi feito
  }
}
