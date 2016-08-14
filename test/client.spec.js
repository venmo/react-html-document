import { expect } from 'chai';

import { getUniversalStateFromScript } from '../src/client';
import { STATE_SCRIPT_ID, ERRORS } from '../src/constants';
import { renderAndGetQuerySelector } from './utils';


describe('Client', () => {
  it('getUniversalStateFromScript grabs state from dom', () => {
    const props = {
      universalState: { myState: true }
    };
    const qs = renderAndGetQuerySelector(props);
    const stateScript = qs(`script#${STATE_SCRIPT_ID}`);
    const parser = script => JSON.parse(script.text());
    const state = getUniversalStateFromScript(stateScript, parser);
    expect(state).to.deep.equal(props.universalState);
  });

  it('getUniversalStateFromScript throws helpful error if there\'s no state on the document', () => {
    const props = {};
    const qs = renderAndGetQuerySelector(props);
    const script = qs(`script#${STATE_SCRIPT_ID}`).html();
    expect(getUniversalStateFromScript.bind(null, script)).to.throw(new RegExp(ERRORS.STATE_NOT_FOUND));
  });
});
