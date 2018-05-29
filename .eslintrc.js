// Available rules can be found here https://eslint.org/docs/rules/
// ... for chai -expect https://www.npmjs.com/package/eslint-plugin-chai-expect

module.exports = {
  'extends': 'airbnb-base',
  'plugins': [
      'webdriverio',
      'chai-expect',
      'jsdoc',
      'chai-friendly'
    ],
  'env': {
    'node': true,
    'mocha': true,
    'webdriverio/wdio': true,
  },
  'globals': {
    'expect': true
  },
  'rules': {
    'parser': 'babel-eslint',
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'ignore'
    }],
    'max-len': [ 'warn', { 'code': 180, 'tabWidth': 2 } ],
    'linebreak-style': 'off',
    'func-names': 'off',
    'prefer-arrow-callback': 'off',
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    // chai rules
    'no-unused-expressions': 'off', // disabled but set to error in 'chai-friendly/no-unused-expressions'
    'chai-friendly/no-unused-expressions': 'error',
    'chai-expect/no-inner-compare': 'error',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/terminating-properties': 'error',


    // jsdoc rules
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'warn',
    'jsdoc/newline-after-description': 'warn',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-returns-type': 'warn'
  }
};
