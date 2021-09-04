import { dbConfig } from '../config/environment';

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
});

// ------------ database initializing -----------------
export function initUser() {
    knex.schema.hasTable('user').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('user', function (table: any) {
                    table.increments();
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at');
                    table.dateTime('updated_at');
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

export function initFindingPetArticle() {
    knex.schema.hasTable('finding_pet_article').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('finding_pet_article', function (table: any) {
                    table.increments();
                    table.integer('user_id').notNullable().references('id').inTable('user');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at');
                    table.dateTime('updated_at');
                })
                .then(function () {
                    console.log('[DataBase Initialized] created finding_pet_article table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initFindingOwnerArticle() {
    knex.schema.hasTable('finding_owner_article').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('finding_owner_article', function (table: any) {
                    table.increments();
                    table.integer('user_id').notNullable().references('id').inTable('user');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at');
                    table.dateTime('updated_at');
                })
                .then(() => {
                    console.log('[DataBase Initialized] created finding_owner_article table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initFindingPetArticleComment() {
    knex.schema.hasTable('finding_pet_article_comment').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('finding_pet_article_comment', function (table: any) {
                    table.increments();
                    table
                        .integer('finding_pet_article_id')
                        .notNullable()
                        .references('id')
                        .inTable('finding_pet_article');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at');
                    table.dateTime('updated_at');
                })
                .then(function () {
                    console.log('[DataBase Initialized] created finding_pet_article_comment table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initFindingOwnerArticleComment() {
    knex.schema.hasTable('finding_owner_article_comment').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('finding_owner_article_comment', function (table: any) {
                    table.increments();
                    table
                        .integer('finding_owner_article_id')
                        .notNullable()
                        .references('id')
                        .inTable('finding_owner_article');
                    table.json('info').defaultTo({}).notNullable();
                    table.dateTime('created_at');
                    table.dateTime('updated_at');
                })
                .then(() => {
                    console.log('[DataBase Initialized] created finding_owner_article_comment table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}
