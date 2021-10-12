"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = void 0;

var _config = _interopRequireDefault(require("./config"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = async projectName => {
  return new Promise((resolve, reject) => {
    //projectName 为下载到的本地目录
    (0, _downloadGitRepo.default)(_config.default.repository, projectName, {
      clone: true
    }, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

exports.downloadLocal = downloadLocal;