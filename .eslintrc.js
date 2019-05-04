'use strict';

module.exports = {
  extends: ['eslint-config-ali'],
  'parser': 'babel-eslint',
  'rules': {
    'react/no-array-index-key': [0],
    'react/prop-types': [0],
    'no-restricted-syntax': [1],
    'no-debugger': [0],
    'react/forbid-prop-types': [0],
    'no-script-url': [0],
    'no-loop-func': [0],
    "no-console": ["error", {
      allow: ["warn", "error", "log"]
    }],
    'import/no-unresolved': [2, { ignore: ['^ROOT/'] }],
    'no-control-regex': [0]
  }
}
