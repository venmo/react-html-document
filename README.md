
![HTMLDocument](/logo.png)

# HTMLDocument


[![Version](https://img.shields.io/github/release/venmo/react-html-document.svg)](https://github.com/venmo/react-html-document/releases)
[![build status](https://img.shields.io/travis/venmo/react-html-document/master.svg?style=flat-square)](https://travis-ci.org/venmo/react-html-document)
[![npm version](https://img.shields.io/npm/v/react-html-document.svg?style=flat-square)](https://www.npmjs.com/package/react-html-document)

HTMLDocument is a foundational [React](https://facebook.github.io/react/) component useful for rendering full html documents on the server.

** **

You'll love **HTMLDocument** if:
* You love (or would love) to use React to render full documents on the server without the need for templates, view engines, or static files.
* You want to render documents in a way that makes it really easy to share state between server and client for hydrating client apps during mounting.


It provides a convenient and simple api for rendering common html tags such as title, meta, stylesheets, and scripts. In addition, it has universal/isomorphic-friendly features such as server state serialization, and support for static and non-static pages.

HTMLDocument is well tested and currently used in production on some of our web projects at [Venmo](http://www.venmo.com).


### Installation

To install the stable version:

```
npm install --save react-html-document
```

This assumes that you’re using [npm](http://npmjs.com/).

### Examples

#### Basic static page

```es6
import HTMLDocument from 'react-html-document';
import ReactDOMServer from 'react-dom/server';

const doc = (
  <HTMLDocument title="My Page">
    <h1>Hello World</h1>
  </HTMLDocument>
);
ReactDOMServer.renderToStaticMarkup(doc);
```
Renders to:
```
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <div id="app">
      <h1>Hello World</h1>
    </div>
  </body>
</html>

```
#### Static page with scripts, stylesheets, and meta tags


```es6
import HTMLDocument from 'react-html-document';
import ReactDOMServer from 'react-dom/server';

const doc = (
  <HTMLDocument
    title="My Page"
    scripts={['/scripts/main.js']}
    stylesheets={['/styles/styles.css']}
    metatags={[
      { name: 'description', content: 'My description' }
    ]} >
    <div>My App</div>
  </HTMLDocument>
  );
ReactDOMServer.renderToStaticMarkup(doc);
```

Renders to:
```
<html>
  <head>
    <link rel="stylesheet" href="/styles/styles.css">
    <meta name="description" content="My Description">
    <title>My Page</title>
  </head>
  <body>
    <div id="app">
      <div>My App</div>
    </div>
    <script src="/scripts/main.js">
  </body>
</html>
```

#### Using Universal state

```es6
import HTMLDocument from 'react-html-document';
import ReactDOMServer from 'react-dom/server';

const state = { user: "X" };
const doc = (
  <HTMLDocument
    title="My Page with Universal State"
    universalState={state}>
  </HTMLDocument>
);
ReactDOMServer.renderToStaticMarkup(doc);
```

Renders to:
```
<html>
  <head>
    <title>My Page with Universal State</title>
  </head>
  <body>
    <div id="app"></div>
    <script id="__HTMLDOCUMENT__UNIVERSAL_STATE" type="application/json">
      { user: "X" }
    </script>
  </body>
</html>
```

HTMLDocument also provides a function to make this even easier:


```es6
// from the client
import { getUniversalState } from 'react-html-document';

const state = getUniversalState(); // { user: "X"}
```

### API


| Prop |  Type | Details | Default
| -------------- | ------ | --------------- | ---- |
| `title` | string | Title for the document. | `''`
| `metatags`    | array | A list of meta tag attributes. | `[ ]`
| `scripts` | array | A list of scripts in one of three forms: string paths `'mysite.com/script.js'`, script src objects `{ src: 'mysite.com/script.js' }` or inline scripts `{ inline: 'var x = 1;' }` | `[ ]`
| `headScripts` | array | A list of scripts inside the head tag. it follows the same format as `scripts`
| `stylesheets` | array | A list of stylesheet in one of three forms: string paths `'mysite.com/styles.css'`, style href objects `{ href: 'mysite.com/styles.css' }` or inline styles `{ inline: 'body { color: '#333' }' }` | `[ ]`
| `universalState` | object | Contains current server state that will be rendered into a script tag of type `application/json` on the page. Helpful for re-mounting with props on the client in universal apps. When not using it, children will be rendered statically. | `null`
| `childrenContainerId`           | string | The id for the dom element that contains the children nodes. | `'app'`
| `favicon` | string | URL to your favicon. | `''`
| `htmlAttributes` | object | [Attributes](https://facebook.github.io/react/docs/tags-and-attributes.html#supported-attributes) that you'd like to use on the html tag. | `{ }`


### Development
Please take a look at `package.json` for available npm scripts.

For starting a dev server: `npm run dev`

For running mocha tests: `npm test`

For compiling `src` directory into `dist` directory with babel: `npm run build`

For linting with eslint: `npm run lint`



### Contributing

We'd love for you to contribute.

Please open PRs from your fork to master. Keep in mind that we're using the [eslint linter](http://eslint.org/) and the [airbnb configuration for it](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). Rebase and squash when appropriate.


### Versioning
This project adheres to [Semantic Versioning](http://semver.org/).


### License
MIT
