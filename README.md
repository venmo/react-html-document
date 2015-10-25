# react-html-document

HTMLDocument is a foundational [React](https://facebook.github.io/react/) component useful for rendering html documents on the server.

It provides a convenient api for rendering common html tags such as title, meta, styles, and scripts. In addition, it has universal/isomorphic-friendly features such as server state sharing, and support for static and non-static React children nodes.

It's well tested and currently used in production on some of our web projects at [Venmo](http://www.venmo.com).

### Installation

To install the stable version:

```
npm install --save react-html-document
```

This assumes that you’re using [npm](http://npmjs.com/).

### Examples

Static page:
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

Universal page with scripts, stylesheets, and meta tags:

```es6
import HTMLDocument from 'react-html-document';
import ReactDOM from 'react-dom/server';

app.get('/mypageroute', function(req, res, next) {
  const doc = (
    <HTMLDocument
      title="My Page"
      scripts=['/scripts/main.js']
      styles=['/styles/styles.css']
      meta={[
        { name: 'description', content: 'My description' }
      ]}
      <MyApp />
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
* getStateForURL is a magical function that resolves to a state object
* based on the current's request url
*/

app.get('/mypageroute', function(req, res, next) {
  getStateForURL(req.url)
    .then(state => {
      const doc = (
        <HTMLDocument
          title="My Page"
          state={state}
          scripts=['/scripts/main.js']
          styles=['/styles/styles.css']
          <MyApp {...state} />
        </HTMLDocument>
      );
      const markup = ReactDOM.renderToStaticMarkup(doc);
      return res.send(markup);
    });
});
```

### API

General Use Props:

| Prop |  Type | Details | Default
| -------------- | ------ | --------------- | ---- |
| `title` | string | Title for the document. | `''`
| `metatags`    | array | A list of meta tag attributes. | `[ ]`
| `scripts` | array | A list of scripts in one of three forms: script src strings `'mysite.com/script.js'`, script src objects `{ src: 'mysite.com/script.js' }` or inline scripts `{ inline: 'var x = 1;' }` | `[ ]`
| `stylesheets` | array | A list of stylesheet href strings `'mysite.com/styles.css'`, style href objects `{ href: 'mysite.com/styles.css' }` or inline styles `{ inline: 'body { color: '#333' }' }` | `[ ]`
| `childrenContainerId`           | string | The id for the dom element that contains the children nodes. | `'app'`

Props for Universal Rendering:

| Prop |  Type | Details | Default
| -------------- | ------ | --------------- | ---- |
| `state` | object | Contains current server state that will be rendered into a javascript object on the page. Helpful for re-mounting with props on the client in universal apps. When not using it, children will be rendered statically. | `null`
| `stateKey` | string | Specifies what key to use when saving the state on the client. `window[stateJSObjectKey] = state;` | `'__state'`



### Development
Please take a look at `package.json`. Main ones you can run are the following:

For running `mocha` tests: `npm run test`

For compiling `src` directory with `babel`: `npm run build`

For linting with `eslint`: `npm run lint`


### Contributing

We'd love for you to contribute.

Please open PRs from your fork to master. Keep in mind that we're using the [eslint linter](http://eslint.org/) and the [airbnb configuration for it](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). Rebase and squash when appropriate.


### Versioning
This project adheres to [Semantic Versioning](http://semver.org/).  


### License
MIT
