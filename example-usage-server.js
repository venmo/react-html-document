import path from 'path';
import http from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HTMLDocument from './src/index';

const PORT = 8080;

function render(req, res) {
  const props = {
    scripts: [
      {
        src: '/dist/my-script.js',
      },
      {
        file: path.join(__dirname, './test/test-script.js')
      },
      {
        inline: 'var x = 2;'
      }
    ],
    headScripts: [
      {
        src: '/dist/my-head-script.js',
      },
      {
        file: path.join(__dirname, './test/test-script.js')
      },
      {
        inline: 'var x = 3;'
      }
    ],
    stylesheets: [
      {
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
      },
      {
        inline: 'p { font-size: large; }'
      },
      {
        file: path.join(__dirname, './test/test-css.css')
      }
    ],
    universalState: {
      foo: true
    },
  };
  const documentEl = (
    <HTMLDocument
      {...props}>
      <h1>Hello World</h1>
    </HTMLDocument>
  );
  const markup = ReactDOMServer.renderToStaticMarkup(documentEl);
  res.end(`<!DOCTYPE html>${markup}`);
}

const server = http.createServer(render);


server.listen(PORT, () => console.log(`ReactHTMLDocument dev server running on port ${PORT}`));
