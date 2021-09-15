module.exports = {
  'root': true,
  'env': {
    'node': true,
    'browser': true,
    'es6': true
  },
  'globals': {
    'Promise': true,
    'chrome': true,
    '$': true,
  },
  'extends': [
    'eslint:recommended'
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'rules': {
    'no-unused-vars': [0, {
      'vars': 'none',
      'args': 'after-used'
    }], //不能有声明后未被使用的变量或参数
    'no-undef': 2, //不能有未定义的变量
    'no-mixed-spaces-and-tabs': 2, //禁止混用tab和空格
    'no-empty': 2, //块语句中的内容不能为空
    'no-redeclare': 2, //禁止重复声明变量
    'no-extra-semi': 1, //禁止不必要的分号
    'eqeqeq': [0, 'never'], //要求使用 === 和 !==
    'quotes': [1, 'single'], //引号类型 `` "" ''
    'semi': [0, 'never'], //语句强制分号结尾
    'semi-spacing': [0, {
      'before': false,
      'after': true
    }], //分号前后空格
    'indent': [0, 2], //缩进风格
    'no-useless-escape': 0, //禁用不必要的转义字符,
    'no-use-before-define': ['error', 'nofunc'], //除了function,其他变量和类未定义前不能使用
    'no-console': 0, //禁用 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off' //禁用 debugger
  },
  // "eslintIgnore": ["hello.js", "world.js"] //忽略的文件

}