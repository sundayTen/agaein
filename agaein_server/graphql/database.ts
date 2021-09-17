import { dbConfig } from '../config/environment';
import { knexSnakeCaseMappers } from 'objection';

// connection
export const knex = require('knex')({
    client: 'pg',
    connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        password: dbConfig.password,
        user: dbConfig.user,
        charset: 'utf8',
    },
    pool: { min: 0, max: 100 },
    ...knexSnakeCaseMappers(),
});

// ------------ database initializing -----------------
export function initUser() {
    knex.schema.hasTable('user').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('user', function (table: any) {
                    table.increments();
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created user table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initLookingForPetArticle() {
    knex.schema.hasTable('looking_for_pet_article').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('looking_for_pet_article', function (table: any) {
                    table.increments();
                    table
                        .integer('user_id')
                        .notNullable()
                        .references('id')
                        .inTable('user')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created looking_for_pet_article table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initLookingForGuardianArticle() {
    knex.schema.hasTable('looking_for_guardian_article').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('looking_for_guardian_article', function (table: any) {
                    table.increments();
                    table
                        .integer('user_id')
                        .notNullable()
                        .references('id')
                        .inTable('user')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(() => {
                    console.log('[DataBase Initialized] created looking_for_guardian_article table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initLookingForPetArticleComment() {
    knex.schema.hasTable('looking_for_pet_article_comment').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('looking_for_pet_article_comment', function (table: any) {
                    table.increments();
                    table
                        .integer('user_id')
                        .notNullable()
                        .references('id')
                        .inTable('user')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table
                        .integer('article_id')
                        .notNullable()
                        .references('id')
                        .inTable('looking_for_pet_article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created looking_for_pet_article_comment table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initLookingForGuardianArticleComment() {
    knex.schema.hasTable('looking_for_guardian_article_comment').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('looking_for_guardian_article_comment', function (table: any) {
                    table.increments();
                    table
                        .integer('user_id')
                        .notNullable()
                        .references('id')
                        .inTable('user')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table
                        .integer('article_id')
                        .notNullable()
                        .references('id')
                        .inTable('looking_for_guardian_article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(() => {
                    console.log('[DataBase Initialized] created looking_for_guardian_article_comment table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}
