import { STATE_SCRIPT_ID, ERRORS } from './constants';


const defaultStateParser = script => JSON.parse(script.textContent);

export function getUniversalStateFromScript(script, parser = defaultStateParser) {
  if ( !script ) {
    throw new Error(ERRORS.STATE_NOT_FOUND);
  }
  return parser(script);
}

export default function getUniversalState() {
  const script = document.getElementById(STATE_SCRIPT_ID);
  return getUniversalStateFromScript(script);
}
