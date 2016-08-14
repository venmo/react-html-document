export const ASSET_TYPES = {
  STYLESHEET: 'STYLESHEET',
  SCRIPT: 'SCRIPT'
};

export const STATE_SCRIPT_ID = '__HTMLDOCUMENT__UNIVERSAL_STATE';

export const ERRORS = {
  FILE: `Error: HTMLDocument is having trouble reading a file. Is the file path correct?`,

  STATE_NOT_FOUND: `Error: HTMLDocument couldn't find state in the DOM.
    Did you pass in a 'universalState' prop to the HTMLDocument?`
};
