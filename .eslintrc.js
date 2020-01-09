module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential",
    "@vue/standard"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "parser": "babel-eslint"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "semi": 0,
    "no-return-assign": 0,
    "no-console": 1,
    "quotes": [2, "single", { "avoidEscape": true }],
    "template-curly-spacing": "off",
    "indent": "off"
  }
};