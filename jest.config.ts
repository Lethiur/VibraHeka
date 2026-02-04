import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    moduleNameMapper: {
        '^@core/Data/Datasources/BackendDatasource$': '<rootDir>/tests/core/Data/Datasources/BackendDatasourceMock.ts',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@auth/(.*)$': '<rootDir>/src/Modules/Features/Auth/$1',
        '^@admin/addTherapist/(.*)$': '<rootDir>/src/Modules/Admin/AddTherapist/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@admin/emailTemplates/(.*)$': '<rootDir>/src/Modules/Admin/Emails/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/Mocks/fileMock.ts',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.app.json',
        }],
    },
    testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/tests/**/*.test.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
