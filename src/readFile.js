import fs from 'fs';

import { ERRORS } from './constants';

let _FILECACHE = {};

export default function readFile(filePath) {
  if ( _FILECACHE[filePath] ) {
    return { fromCache: true, contents: _FILECACHE[filePath] };
  }
  try {
    // Reading file async would require API changes to render React
    // async on the server.
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    _FILECACHE[filePath] = fileContents;
    return { fromCache: false, contents: fileContents };
  } catch (e) {
    throw new Error(`${ERRORS.FILE} Original error:\n ${e.message}`);
  }
}

export function clearCache() {
  _FILECACHE = {};
}
