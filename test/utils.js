import React from 'react';
import cheerio from 'cheerio';
import HTMLDocument from '../src/index';
import { renderToStaticMarkup } from 'react-dom/server';


export function renderAndGetQuerySelector(props, children) {
  const htmlDocumentEl = <HTMLDocument {...props}>{children}</HTMLDocument>;
  const markup = renderToStaticMarkup(htmlDocumentEl);
  return cheerio.load(markup);
}
