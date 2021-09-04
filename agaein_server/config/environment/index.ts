import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const env = {
    development: process.env.NODE_ENV === 'develop',
    production: process.env.NODE_ENV === 'production',
};

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
};

export { port, env, dbConfig };
