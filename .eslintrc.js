module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    "prefer-regex-literals": 0
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    uni: true
  }
}
