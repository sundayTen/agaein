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
                    table.string('nickname');
                    table.string('email');
                    table.string('kakao_id').notNullable();
                    table.string('phone_number');
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

export function initBookmark() {
    knex.schema.hasTable('bookmark').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('bookmark', function (table: any) {
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
                        .inTable('article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                })
                .then(function () {
                    console.log('[DataBase Initialized] created bookmark table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initArticle() {
    knex.schema.hasTable('article').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('article', function (table: any) {
                    table.increments();
                    table
                        .integer('user_id')
                        .notNullable()
                        .references('id')
                        .inTable('user')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.integer('view').notNullable();
                    table.string('type').notNullable();
                    table.text('content').notNullable();
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created article table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initComment() {
    knex.schema.hasTable('comment').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('comment', function (table: any) {
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
                        .inTable('article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table
                        .integer('comment_id')
                        .references('id')
                        .inTable('comment')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.text('content').notNullable();
                    table.string('password');
                    table.dateTime('created_at').notNullable();
                    table.dateTime('updated_at').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created comment table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initBreed() {
    knex.schema.hasTable('breed').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('breed', function (table: any) {
                    table.increments();
                    table.string('type').notNullable();
                    table.string('breed').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created breed table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initImage() {
    knex.schema.hasTable('image').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('image', function (table: any) {
                    table.increments();
                    table
                        .integer('article_id')
                        .notNullable()
                        .references('id')
                        .inTable('article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.string('url').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created image table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initLFG() {
    knex.schema.hasTable('lfg').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('lfg', function (table: any) {
                    table.increments();
                    table
                        .integer('article_id')
                        .notNullable()
                        .references('id')
                        .inTable('article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.integer('breed_id').notNullable().references('id').inTable('breed').onUpdate('CASCADE');
                    table.string('name').notNullable();
                    table.string('feature').notNullable();
                    table.string('gender').notNullable();
                    table.string('password');
                    table.boolean('alarm').defaultTo(false).notNullable();
                    table.integer('age').notNullable();
                    table.json('location').defaultTo({}).notNullable();
                    table.dateTime('found_date').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created lfg table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initLFP() {
    knex.schema.hasTable('lfp').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('lfp', function (table: any) {
                    table.increments();
                    table
                        .integer('article_id')
                        .notNullable()
                        .references('id')
                        .inTable('article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                    table.integer('breed_id').notNullable().references('id').inTable('breed').onUpdate('CASCADE');
                    table.string('name').notNullable();
                    table.string('feature').notNullable();
                    table.string('gender').notNullable();
                    table.integer('gratuity').notNullable();
                    table.string('password');
                    table.boolean('alarm').defaultTo(false).notNullable();
                    table.integer('age').notNullable();
                    table.json('location').defaultTo({}).notNullable();
                    table.dateTime('lost_date').notNullable();
                })
                .then(function () {
                    console.log('[DataBase Initialized] created lfp table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}

export function initReview() {
    knex.schema.hasTable('review').then(function (exists: boolean) {
        if (!exists) {
            knex.schema
                .createTable('review', function (table: any) {
                    table.increments();
                    table
                        .integer('article_id')
                        .notNullable()
                        .references('id')
                        .inTable('article')
                        .onUpdate('CASCADE')
                        .onDelete('CASCADE');
                })
                .then(function () {
                    console.log('[DataBase Initialized] created review table');
                })
                .catch((error: String) => {
                    console.error(error);
                });
        }
    });
}
