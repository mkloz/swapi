import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { getEnvVar } from './config';

export function getTypeormConfig(): MysqlConnectionOptions {
  const { mysql } = getEnvVar();
  return {
    type: 'mysql',
    host: mysql.host,
    username: mysql.user,
    password: mysql.password,
    database: mysql.database,
    port: mysql.port,

    synchronize: false,
    entities: ['dist/**/*.entity{.js,.ts}'],
    dropSchema: false,
    logging: false,
    migrationsRun: false,
    migrations: ['dist/db/migrations/*{.js, .ts}'],
    migrationsTableName: 'typeorm_migrations',
  };
}

export default new DataSource(getTypeormConfig());
