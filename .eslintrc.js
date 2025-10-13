module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
  },
  plugins: ['prettier'],
}
