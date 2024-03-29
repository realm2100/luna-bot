const OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },

  plugins: [
    "@typescript-eslint",
    "jsdoc"
  ],

  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:jsdoc/recommended-typescript"
  ],

  rules: {
    "@typescript-eslint/no-var-requires": OFF,
    "no-extra-parens": ERROR,
    "no-unexpected-multiline": ERROR,
    "jsdoc/require-jsdoc": [WARN, {
      require: {
        FunctionDeclaration: true,
        ArrowFunctionExpression: true,
        FunctionExpression: true
      }
    }],
    "jsdoc/require-param": OFF,
    "jsdoc/require-description": WARN,
    "jsdoc/require-example": [WARN, {
      enableFixer: true
    }],
    "jsdoc/require-returns": OFF,

    "accessor-pairs": [ERROR, {
      getWithoutSet: false,
      setWithoutGet: true
    }],
    "block-scoped-var": WARN,
    "consistent-return": OFF,
    "curly": ERROR,
    "default-case": WARN,
    "dot-location": [WARN, "property"],
    "dot-notation": WARN,
    "eqeqeq": OFF,
    "guard-for-in": OFF,
    "no-alert": ERROR,
    "no-caller": ERROR,
    "no-case-declarations": WARN,
    "no-div-regex": WARN,
    "no-else-return": WARN,
    "no-empty-pattern": WARN,
    "no-eq-null": WARN,
    "no-eval": OFF,
    "no-extend-native": ERROR,
    "no-extra-bind": WARN,
    "no-floating-decimal": WARN,
    "no-implicit-coercion": [WARN, {
      boolean: true,
      number: true,
      string: true
    }],
    "no-implied-eval": ERROR,
    "no-invalid-this": ERROR,
    "no-iterator": ERROR,
    "no-labels": WARN,
    "no-lone-blocks": WARN,
    "no-loop-func": OFF,
    "no-magic-numbers": OFF,
    "no-multi-spaces": ERROR,
    "no-multi-str": WARN,
    "no-native-reassign": ERROR,
    "no-new-func": ERROR,
    "no-new-wrappers": ERROR,
    "no-new": ERROR,
    "no-octal-escape": ERROR,
    "no-param-reassign": OFF,
    "no-process-env": OFF,
    "no-proto": ERROR,
    "no-redeclare": ERROR,
    "no-return-assign": ERROR,
    "no-script-url": ERROR,
    "no-self-compare": ERROR,
    "no-throw-literal": ERROR,
    "no-unused-expressions": ERROR,
    "no-useless-call": ERROR,
    "no-useless-concat": ERROR,
    "no-void": WARN,
    "no-warning-comments": [WARN, {
      terms: ["FIXME"],
      location: "start"
    }],
    "no-with": WARN,
    "radix": WARN,
    "vars-on-top": ERROR,
    "wrap-iife": [ERROR, "outside"],
    "yoda": ERROR,

    "strict": [ERROR, "never"],

    "init-declarations": [ERROR, "always"],
    "no-catch-shadow": OFF,
    "no-delete-var": ERROR,
    "no-label-var": ERROR,
    "no-shadow-restricted-names": ERROR,
    "no-shadow": WARN,
    "no-undef-init": OFF,
    "no-undef": ERROR,
    "no-undefined": OFF,
    "no-unused-vars": OFF,
    "@typescript-eslint/no-unused-vars": [WARN, {
      argsIgnorePattern: "^_"
    }],
    "no-use-before-define": OFF,

    "callback-return": [WARN, ["callback", "next"]],
    "global-require": OFF,
    "handle-callback-err": WARN,
    "no-mixed-requires": WARN,
    "no-new-require": ERROR,
    "no-path-concat": ERROR,
    "no-process-exit": OFF,
    "no-restricted-modules": OFF,
    "no-sync": OFF,

    "arrow-body-style": [ERROR, "always"],
    "arrow-parens": [ERROR, "always"],
    "arrow-spacing": [ERROR, { before: true, after: true }],
    "constructor-super": ERROR,
    "generator-star-spacing": [ERROR, "before"],
    "no-class-assign": ERROR,
    "no-const-assign": ERROR,
    "no-dupe-class-members": ERROR,
    "no-this-before-super": ERROR,
    "no-var": WARN,
    "object-shorthand": [WARN, "never"],
    "prefer-arrow-callback": WARN,
    "prefer-const": WARN,
    "prefer-spread": WARN,
    "prefer-template": WARN,
    "require-yield": ERROR,

    "array-bracket-spacing": [WARN, "never"],
    "block-spacing": [WARN, "always"],
    "brace-style": [WARN, "1tbs", { allowSingleLine: false }],
    "camelcase": OFF,
    "comma-spacing": [WARN, { before: false, after: true }],
    "comma-style": [WARN, "last"],
    "computed-property-spacing": [WARN, "never"],
    "consistent-this": [WARN, "self"],
    "eol-last": WARN,
    "func-names": WARN,
    "func-style": [OFF, "declaration"],
    "id-length": OFF,
    "indent": [WARN, 2, { SwitchCase: 1 }],
    "jsx-quotes": [WARN, "prefer-double"],
    "linebreak-style": [WARN, "unix"],
    "lines-around-comment": OFF,
    "max-depth": [WARN, 8],
    "max-len": OFF,
    "max-nested-callbacks": [WARN, 8],
    "max-params": [WARN, 8],
    "new-cap": WARN,
    "new-parens": WARN,
    "no-array-constructor": WARN,
    "no-bitwise": OFF,
    "no-continue": OFF,
    "no-inline-comments": OFF,
    "no-lonely-if": WARN,
    "no-mixed-spaces-and-tabs": WARN,
    "no-multiple-empty-lines": WARN,
    "no-negated-condition": OFF,
    "no-nested-ternary": OFF,
    "no-new-object": WARN,
    "no-plusplus": OFF,
    "no-spaced-func": WARN,
    "no-ternary": OFF,
    "no-trailing-spaces": WARN,
    "no-underscore-dangle": WARN,
    "no-unneeded-ternary": WARN,
    "object-curly-spacing": [WARN, "always"],
    "one-var": OFF,
    "operator-assignment": OFF,
    "operator-linebreak": [WARN, "after"],
    "padded-blocks": [WARN, "never"],
    "quote-props": [WARN, "consistent-as-needed"],
    "quotes": [WARN, "double"],
    "semi-spacing": [WARN, { before: false, after: true }],
    "semi": [ERROR, "always"],
    "sort-vars": OFF,
    "space-before-blocks": [WARN, "always"],
    "space-before-function-paren": [WARN, "never"],
    "keyword-spacing": [WARN, {
      before: true,
      after: true
    }],
    "space-in-parens": [WARN, "never"],
    "space-infix-ops": [WARN, { int32Hint: true }],
    "space-unary-ops": ERROR,
    "spaced-comment": [WARN, "always"],
    "wrap-regex": WARN
  }
};
