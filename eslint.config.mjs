import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {FlatCompat} from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  {ignores: ['.next/**', '.next-production/**', 'node_modules/**', 'syntaxstudio.no/**', '_archive/**', '.impeccable/**', '.playwright-mcp/**']},
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
