# HTMLDocument

[![Version](https://img.shields.io/github/release/venmo/react-html-document.svg)](https://github.com/venmo/react-html-document/releases)
[![build status](https://img.shields.io/travis/venmo/react-html-document/master.svg?style=flat-square)](https://travis-ci.org/venmo/react-html-document)
[![npm version](https://img.shields.io/npm/v/react-html-document.svg?style=flat-square)](https://www.npmjs.com/package/react-html-document)

HTMLDocument is a foundational [React](https://facebook.github.io/react/) component useful for rendering full html documents on the server.

It provides a convenient and simple api for rendering common html tags such as title, meta, stylesheets, and scripts. In addition, it has universal/isomorphic-friendly features such as server state serialization, and support for static and non-static pages. HTMLDocument is also well tested and currently used in production on some of our web projects at [Venmo](http://www.venmo.com), so it's safe to use.

You no longer need to write boilerplate html strings or roll out your own custom HTML component from scratch on every project you start. Have fun using it!

### Installation

To install the stable version:

```
npm install --save react-html-document
```

This assumes that you’re using [npm](http://npmjs.com/).

### Examples

Basic static page:
```es6
import HTMLDocument from 'react-html-document';
import ReactDOM from 'react-dom/server';

app.get('/mypageroute', function(req, res, next) {
  const doc = (
    <HTMLDocument title="My Page">
      <h1>Hello World</h1>
    </HTMLDocument>
  );
  const markup = ReactDOM.renderToStaticMarkup(doc);
  return res.send(markup);
});
```

Static page with scripts, stylesheets, and meta tags:

```es6
import HTMLDocument from 'react-html-document';
import ReactDOM from 'react-dom/server';

app.get('/mypageroute', function(req, res, next) {
  const doc = (
    <HTMLDocument
      title="My Page"
      scripts={['/scripts/main.js']}
      stylesheets={['/styles/styles.css']}
      metatags={[
        { name: 'description', content: 'My description' }
      ]} >
      <MyPage />
    </HTMLDocument>
  );
  const markup = ReactDOM.renderToStaticMarkup(doc);
  return res.send(markup);
});
```

Universal page with state:

```es6
import HTMLDocument from 'react-html-document';
import ReactDOM from 'react-dom/server';

/**
* for illustration purposes, getStateForURL is an unimplemented function that
* returns a promise that resolves to a state object based on the current
* request's url
*/

app.get('/mypageroute', function(req, res, next) {
  getStateForURL(req.url)
    .then(state => {
      const doc = (
        <HTMLDocument
          title="My Page"
          state={state}
          scripts={['/scripts/main.js']}
          stylesheets={['/styles/styles.css']} >
          <MyApp {...state} />
        </HTMLDocument>
      );
      const markup = ReactDOM.renderToStaticMarkup(doc);
      return res.send(markup);
    });
});

// later on the client
const state = JSON.parse(document.getElementById('__state').dataset.state);
Render.render(<MyApp {...state} />, document.getElementById('app'));
```

### API

General Use Props:

| Prop |  Type | Details | Default
| -------------- | ------ | --------------- | ---- |
| `title` | string | Title for the document. | `''`
| `metatags`    | array | A list of meta tag attributes. | `[ ]`
| `scripts` | array | A list of scripts in one of three forms: string paths `'mysite.com/script.js'`, script src objects `{ src: 'mysite.com/script.js' }` or inline scripts `{ inline: 'var x = 1;' }` | `[ ]`
| `stylesheets` | array | A list of stylesheet in one of three forms: string paths `'mysite.com/styles.css'`, style href objects `{ href: 'mysite.com/styles.css' }` or inline styles `{ inline: 'body { color: '#333' }' }` | `[ ]`
| `childrenContainerId`           | string | The id for the dom element that contains the children nodes. | `'app'`
| `htmlAttributes` | object | [Attributes](https://facebook.github.io/react/docs/tags-and-attributes.html#supported-attributes) that you'd like to use on the html tag. | `{ }`

Props for Universal Rendering:

| Prop |  Type | Details | Default
| -------------- | ------ | --------------- | ---- |
| `state` | object | Contains current server state that will be rendered into a div element inside a `data-state` attribute on the page. Helpful for re-mounting with props on the client in universal apps. When not using it, children will be rendered statically. | `null`
| `stateKey` | string | Specifies what key to use when saving the state on the client. `<div id="stateKey" data-state="state"` | `'__state'`



### Development
Please take a look at `package.json` for available npm scripts.

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
