import React from 'react';
import path from 'path';
import fs from 'fs';
import { expect } from 'chai';

import { STATE_SCRIPT_ID } from '../src/constants';

import { renderAndGetQuerySelector } from './utils';
import TestApp from './TestApp';


describe('HTMLDocument', () => {
  it('should render with default props', () => {
    const props = { };
    const qs = renderAndGetQuerySelector(props);
    expect(qs('html').length).to.equal(1);
  });

  it('should render page title', () => {
    const props = {
      title: 'My Title'
    };
    const qs = renderAndGetQuerySelector(props);
    expect(qs('title').html()).to.equal(props.title);
  });

  it('should render html attributes', () => {
    const props = {
      htmlAttributes: {
        lang: 'es'
      }
    };
    const qs = renderAndGetQuerySelector(props);
    expect(qs('html').attr('lang')).to.equal(props.htmlAttributes.lang);
  });

  it('should render favicon link', () => {
    const props = {
      favicon: 'path/to/favicon.ico'
    };
    const qs = renderAndGetQuerySelector(props);
    const $links = qs('link');
    expect($links.length).to.equal(1);
    expect($links.attr('rel')).to.equal('icon');
    expect($links.attr('href')).to.equal(props.favicon);
  });

  describe('Metatags', () => {
    it('should render metatags', () => {
      const props = {
        metatags: [
          { name: 'description', content: 'My Description' },
          { name: 'title', content: 'My Title' }
        ]
      };
      const qs = renderAndGetQuerySelector(props);
      const $metatags = qs('meta');
      expect($metatags.length).to.equal(2);
      $metatags.each((index, metatag) => {
        expect(metatag.attribs).to.deep.equal(props.metatags[index]);
      });
    });
  });

  describe('Stylesheets', () => {
    it('should render linked stylesheets from a list of strings', () => {
      const props = {
        stylesheets: ['mysite.com/styles.css']
      };
      const qs = renderAndGetQuerySelector(props);
      const $links = qs('link');
      expect($links.length).to.equal(1);
      expect($links.attr('href')).to.equal(props.stylesheets[0]);
    });

    it('should render linked stylesheet from a list of objects', () => {
      const props = {
        stylesheets: [
          { href: 'mysite.com/styles.css' }
        ]
      };
      const qs = renderAndGetQuerySelector(props);
      const $links = qs('link');
      expect($links.length).to.equal(1);
      expect($links.attr('href')).to.equal(props.stylesheets[0].href);
    });

    it('should render inline styles', () => {
      const props = {
        stylesheets: [
          { inline: '.body { color: #333 }' }
        ]
      };
      const qs = renderAndGetQuerySelector(props);
      const $styles = qs('style');
      expect($styles.length).to.equal(1);
      expect($styles.html()).to.equal(props.stylesheets[0].inline);
    });

    it('should render stylesheets from files', () => {
      const file = path.join(__dirname, 'test-css.css');
      const props = {
        stylesheets: [
          { file }
        ]
      };
      const styleSheetContents = fs.readFileSync(file, 'utf-8');
      const qs = renderAndGetQuerySelector(props);
      const $styles = qs('style');
      expect($styles.length).to.equal(1);
      expect($styles.html()).to.equal(styleSheetContents);
    });
  });

  describe('State', () => {
    it('should render universalState script', () => {
      const universalState = {
        user: {
          name: 'Professor Charles Xavier'
        }
      };
      const props = {
        universalState
      };
      const qs = renderAndGetQuerySelector(props);
      const universalStateFromDOM = JSON.parse(qs(`script#${STATE_SCRIPT_ID}`).text());
      expect(universalStateFromDOM).to.deep.equal(universalState);
    });

    it('should use internal universalState key as universalState script id', () => {
      const props = {
        universalState: { myuniversalState: true }
      };
      const qs = renderAndGetQuerySelector(props);
      expect(qs(`script#${STATE_SCRIPT_ID}`).length).to.equal(1);
    });
  });

  describe('Scripts', () => {
    it('should render script tags from a list of strings', () => {
      const props = {
        scripts: [
          'mysite.com/main.js'
        ],
        universalStateKey: '__universalState'
      };
      const qs = renderAndGetQuerySelector(props);
      const $scripts = qs('script').not(`[data-${props.universalStateKey}]`);
      expect($scripts.length).to.equal(1);
      expect($scripts.get(0).attribs.src).to.equal(props.scripts[0]);
    });

    it('should render script tags from a list of objects', () => {
      const props = {
        scripts: [
          { src: 'mysite.com/main.js' }
        ],
        universalStateKey: '__universalState'
      };
      const qs = renderAndGetQuerySelector(props);
      const $scripts = qs('script').not(`script[data-${props.universalStateKey}]`);
      expect($scripts.length).to.equal(1);
      expect($scripts.get(0).attribs.src).to.equal(props.scripts[0].src);
    });

    it('should render inline scripts', () => {
      const props = {
        scripts: [
          { inline: 'window.myApp = true;' }
        ]
      };
      const qs = renderAndGetQuerySelector(props);
      const $scripts = qs('script').not(`script#${STATE_SCRIPT_ID}`);
      expect($scripts.length).to.equal(1);
      expect($scripts.html()).to.equal(props.scripts[0].inline);
    });

    it('should render scripts from files', () => {
      const file = path.join(__dirname, 'test-script.js');
      const props = {
        scripts: [
          { file }
        ]
      };
      const scriptContents = fs.readFileSync(file, 'utf-8');
      const qs = renderAndGetQuerySelector(props);
      const $scripts = qs('script').not(`script#${STATE_SCRIPT_ID}`);
      expect($scripts.length).to.equal(1);
      expect($scripts.html()).to.equal(scriptContents);
    });

    it('should render scripts inside head tag', () => {
      const props = {
        headScripts: [
          { inline: 'window.myApp = true;' }
        ],
      };
      const qs = renderAndGetQuerySelector(props);
      const $scripts = qs('head script').not(`script#${STATE_SCRIPT_ID}`);
      expect($scripts.length).to.equal(1);
      expect($scripts.html()).to.equal(props.headScripts[0].inline);
    });
  });

  describe('Children', () => {
    it('should use right children container id', () => {
      const childrenContainerId = 'my-app';
      const props = {
        childrenContainerId
      };
      const children = <TestApp />;
      const qs = renderAndGetQuerySelector(props, children);
      expect(qs(`#${childrenContainerId}`).length).to.equal(1);
    });

    it('should render children with own props', () => {
      const props = {
        childrenContainerId: 'app'
      };
      const testAppProps = {
        message: 'Sahp'
      };
      const children = <TestApp {...testAppProps} />;
      const qs = renderAndGetQuerySelector(props, children);
      expect(qs(`#${props.childrenContainerId}`).text()).to.equal(testAppProps.message);
    });

    it('should render children statically when given no universalState', () => {
      const props = { };
      const children = <TestApp />;
      const qs = renderAndGetQuerySelector(props, children);
      const reactSelector = '[data-reactid]';
      expect(qs(reactSelector).length).to.equal(0);
    });

    it('should render children with react ids for client mounting when given universalState', () => {
      const props = {
        universalState: { myuniversalState: true }
      };
      const children = <TestApp />;
      const qs = renderAndGetQuerySelector(props, children);
      const reactSelector = '[data-reactid]';
      expect(qs(reactSelector).length).to.equal(1);
    });
  });
});
