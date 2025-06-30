module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  rules: {
    // 自定义规则（如强制单引号）
    'quotes': ['error', 'single']
  }
};
