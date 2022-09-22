module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/database.ts'],
};
