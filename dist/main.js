"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _constants = require("./utils/constants");

var _index = _interopRequireDefault(require("./index"));

var _chalk = _interopRequireDefault(require("chalk"));

var _commandMap = _interopRequireDefault(require("./commandMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

for (const command in _commandMap.default) {
  const {
    description,
    alias
  } = _commandMap.default[command];

  const instance = _commander.default.command(command);

  instance.description(description);
  instance.alias(alias);
  instance.action(() => {
    (0, _index.default)(command, ...process.argv.slice(3));
  });
}

function help() {
  console.log('\r\nUsage:');

  for (const command in _commandMap.default) {
    _commandMap.default[command].usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  }

  console.log('\r');
}

_commander.default.usage('<command> [options]');

_commander.default.on('-h', help);

_commander.default.on('--help', help);

_commander.default.version(_constants.VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander.default.outputHelp(_chalk.default.green);
}