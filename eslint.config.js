import js from '@eslint/js';
import globals from 'globals';
import { configs } from 'eslint-plugin-unicorn';
import recommendedConfig from 'eslint-plugin-prettier/recommended';

export default [
    js.configs.recommended,
    configs['flat/all'],
    recommendedConfig,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        ignores: ['node_modules/', 'coverage/', 'features/'],
    },
];
