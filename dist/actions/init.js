"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _download = require("../utils/download");

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const symbol = {
  info: _chalk.default.blue('ℹ'),
  success: _chalk.default.green('✔'),
  warning: _chalk.default.yellow('⚠'),
  error: _chalk.default.red('✖')
}; // 命令行交互问答

const askQuestions = defaultProjectName => {
  const questions = [{
    name: "projectName",
    type: "input",
    message: "Please enter the project name: ",
    default: defaultProjectName
  }, {
    name: "description",
    type: "input",
    message: "Please enter the project description: "
  }, {
    name: "author",
    type: "input",
    message: "Please enter the project author: "
  }];
  return _inquirer.default.prompt(questions);
};

var _default = async (action, defaultProjectName) => {
  const {
    projectName,
    description,
    author
  } = await askQuestions(defaultProjectName);

  if (_fs.default.existsSync(projectName)) {
    console.log(symbol.error, _chalk.default.red(`${projectName} fold already exists!`));
    return;
  }

  const loading = (0, _ora.default)(`${projectName} is downloading now ...`);
  loading.start();

  try {
    await (0, _download.downloadLocal)(projectName);
    const fileName = `${projectName}/package.json`;
    if (!_fs.default.existsSync(fileName)) return loading.fail();

    const data = _fs.default.readFileSync(fileName).toString();

    const json = JSON.parse(data);
    json.name = projectName;
    json.author = author;
    json.description = description;

    _fs.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');

    console.log(symbol.success, _chalk.default.green(`${projectName} download is finish`));
    loading.succeed();
  } catch (error) {
    console.error(error);
    loading.fail();
  }
};

exports.default = _default;