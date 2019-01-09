module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "strict": ["off", "function"],
    "indent": ["warn", 2, {"SwitchCase": 1}],
    "no-console": "off",
    "brace-style": [1, "stroustrup", {"allowSingleLine": true}],
    "comma-style": [1, "last"],
    "default-case": 2,
    "no-floating-decimal": 2,
    "space-before-function-paren": [1, {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "keyword-spacing": [2, {"after": true}],
    "space-before-blocks": 1,
    "wrap-iife": [2, "any"],
    "no-alert": 2,
    "curly": [2, "all"],
    "no-empty": [2, {"allowEmptyCatch": true}],
    "no-obj-calls": 2,
    "no-unused-vars": [1, {"vars": "local", "args": "after-used"}],
    "no-invalid-regexp": 2,
    "comma-dangle": [1, "never"],
    "no-undef": 2,
    "no-new": 2,
    "no-extra-semi": 0,
    "no-caller": 1,
    "semi": 0,
    "no-unreachable": 2,
    "no-multi-str": 1,
    "no-mixed-spaces-and-tabs": 1,
    "no-trailing-spaces": 1,
    "space-infix-ops": 1,
    "no-with": 2,
    "dot-notation": 1,
    "semi-spacing": 1,
    "key-spacing": [1, {"beforeColon": false, "afterColon": true, "mode": "minimum"}],
    "space-in-parens": [1, "never"],
    "prefer-const": 2,

    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'constructor-super': 2,
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'generator-star-spacing': 0,
    'handle-callback-err': [2, '^(err|error)$'],
    'jsx-quotes': [2, 'prefer-single'],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-fallthrough': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unsafe-finally': 2,
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [1, 'always', { objectsInObjects: false }],
    'array-bracket-spacing': [2, 'never'],

    'vue/require-v-for-key': 0,
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/no-unused-vars': 1,
    'vue/html-self-closing': 0,
    'vue/require-default-prop': 0,
    "vue/no-parsing-error": 0,
    "vue/attribute-hyphenation": 0
  }
}
