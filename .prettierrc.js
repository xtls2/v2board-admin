const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  semi: false,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
}
