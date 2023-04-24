import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { getTypeormConfig } from './data-source.config';

function getOrmConfig(): MysqlConnectionOptions {
  return {
    ...getTypeormConfig(),
    migrations: ['dist/db/seeds/*.seed.js'],
    migrationsTableName: 'typeorm_seeds',
  };
}
export default new DataSource(getOrmConfig());
