'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = readFile;
exports.clearCache = clearCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _constants = require('./constants');

var _FILECACHE = {};

function readFile(filePath) {
  if (_FILECACHE[filePath]) {
    return { fromCache: true, contents: _FILECACHE[filePath] };
  }
  try {
    // Reading file async would require API changes to render React
    // async on the server.
    var fileContents = _fs2['default'].readFileSync(filePath, 'utf-8');
    _FILECACHE[filePath] = fileContents;
    return { fromCache: false, contents: fileContents };
  } catch (e) {
    throw new Error(_constants.ERRORS.FILE + ' Original error:\n ' + e.message);
  }
}

function clearCache() {
  _FILECACHE = {};
}