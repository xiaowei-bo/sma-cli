"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _config = _interopRequireDefault(require("./utils/config"));

var _chalk = _interopRequireDefault(require("chalk"));

var _commandMap = _interopRequireDefault(require("./utils/commandMap"));

var actions = _interopRequireWildcard(require("./actions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    actions[command](command, ...process.argv.slice(3));
  });
}

_commander.default.usage('<command> [options]');

_commander.default.version(_config.default.version, "-V, --version");

_commander.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(_chalk.default.green(_commander.default.helpInformation()));
}