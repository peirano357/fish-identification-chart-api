const typeormConfig = {
  name: 'default',
  type: 'postgres',
  username: 'postgres',
  password: 'docker',
  database: 'fic',
  host: 'localhost',
  port: 5432,
  synchronize: false,
  logging: false,
  entities: ['dist/src/auth/*.entity.js', 'dist/src/regions/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    entitiesDir: 'src/regions',
    migrationsDir: 'dist/migration',
  },
};

module.exports = typeormConfig;