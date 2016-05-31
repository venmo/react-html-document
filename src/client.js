import { STATE_SCRIPT_ID, ERRORS } from './constants';


const defaultStateParser = script => JSON.parse(script.innerText);

export function getServerStateFromScript(script, parser = defaultStateParser) {
  if ( !script ) {
    throw new Error(ERRORS.STATE_NOT_FOUND);
  }
  return parser(script);
}

export default function getServerState() {
  const script = document.getElementById(STATE_SCRIPT_ID);
  return getServerStateFromScript(script);
}
