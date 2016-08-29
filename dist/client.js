'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getUniversalStateFromScript = getUniversalStateFromScript;
exports['default'] = getUniversalState;

var _constants = require('./constants');

var defaultStateParser = function defaultStateParser(script) {
  return JSON.parse(script.textContent);
};

function getUniversalStateFromScript(script) {
  var parser = arguments.length <= 1 || arguments[1] === undefined ? defaultStateParser : arguments[1];

  if (!script) {
    throw new Error(_constants.ERRORS.STATE_NOT_FOUND);
  }
  return parser(script);
}

function getUniversalState() {
  var script = document.getElementById(_constants.STATE_SCRIPT_ID);
  return getUniversalStateFromScript(script);
}