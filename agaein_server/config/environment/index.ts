import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const env = {
    test: process.env.NODE_ENV === 'test',
    development: process.env.NODE_ENV === 'develop',
    production: process.env.NODE_ENV === 'production',
};

const dbConfig = env.test
    ? {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.TEST_DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PW,
      }
    : {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PW,
      };

const jwtSecretKey = <string>process.env.JWT_SECRET_KEY;
const passwordHashKey = <string>process.env.PASSWORD_HASH_KEY;

export { port, env, dbConfig, jwtSecretKey, passwordHashKey };
