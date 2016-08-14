import path from 'path';
import fs from 'fs';
import { expect } from 'chai';

import { ERRORS } from '../src/constants';
import readFile, { clearCache } from '../src/readFile';


describe('readFile', () => {
  it('returns files contents as utf8 string', () => {
    const file = path.join(__dirname, 'test-script.js');
    const expectedFileContents = fs.readFileSync(file, 'utf-8');
    expect(readFile(file).contents).to.equal(expectedFileContents);
  });

  it('throws helpful error when file doesn\'t exist', () => {
    const file = path.join(__dirname, 'script-that-doesnt-exist.js');
    expect(readFile.bind(null, file)).to.throw(new RegExp(ERRORS.FILE));
  });

  it('reads file contents from memory cache after being called once', () => {
    const file = path.join(__dirname, 'test-script.js');
    const expectedFileContents = fs.readFileSync(file, 'utf-8');
    clearCache();
    const { contents: firstReadContents, fromCache: firstReadFromCache } = readFile(file);
    expect(firstReadContents).to.equal(expectedFileContents);
    expect(firstReadFromCache).to.be.false; // eslint-disable-line
    const { contents: secondReadContents, fromCache: secondReadFromCache } = readFile(file);
    expect(secondReadContents).to.equal(expectedFileContents);
    expect(secondReadFromCache).to.be.true; // eslint-disable-line
  });
});
