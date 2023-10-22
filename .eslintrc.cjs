module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended', 
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
        jsx: true
      },
  },
  plugins: ['react-refresh', "prettier", "unused-imports", "simple-import-sort"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ], 
   "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "newline-before-return": "warn",
    "react/react-in-jsx-scope": "off"
  },
}
