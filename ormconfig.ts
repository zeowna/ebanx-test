// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const config = {
  type: 'mysql' as any,
  host: 'database',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ebanx-test',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['./dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
};

export default config;
