'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var ASSET_TYPES = {
  STYLESHEET: 'STYLESHEET',
  SCRIPT: 'SCRIPT'
};

exports.ASSET_TYPES = ASSET_TYPES;
var STATE_SCRIPT_ID = '__HTMLDOCUMENT__UNIVERSAL_STATE';

exports.STATE_SCRIPT_ID = STATE_SCRIPT_ID;
var ERRORS = {
  FILE: 'Error: HTMLDocument is having trouble reading a file. Is the file path correct?',

  STATE_NOT_FOUND: 'Error: HTMLDocument couldn\'t find state in the DOM.\n    Did you pass in a \'universalState\' prop to the HTMLDocument?'
};
exports.ERRORS = ERRORS;