/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `${__dirname}/.env.stage.dev` });

const typeormConfig = {
  name: 'default',
  type: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  synchronize: false,
  logging: false,
  entities: [
    'dist/src/auth/*.entity.js',
    'dist/src/regions/*.entity.js',
    'dist/src/critters/*.entity.js',
    'dist/src/critters-region/*.entity.js',
  ],
  migrations: ['dist/migration/*.js'],
  cli: {
    entitiesDir: 'src/regions',
    migrationsDir: 'dist/migration',
  },
};

module.exports = typeormConfig;