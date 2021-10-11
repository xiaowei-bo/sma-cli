"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const commandMap = {
  init: {
    description: 'generate a new project from a template',
    usages: ['sma init projectName']
  },
  config: {
    alias: 'cfg',
    description: 'config .smarc',
    usages: ['sma config set <k> <v>', 'sma config get <k>', 'sma config remove <k>']
  } //other commands

};
var _default = actionMap;
exports.default = _default;