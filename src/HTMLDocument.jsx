import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';


class HTMLDocument extends Component {

  renderChildren() {
    if ( !this.props.children ) return null;
    const { children, childrenContainerId, state } = this.props;
    const markup = state ?
      ReactDOM.renderToString(children) :
      ReactDOM.renderToStaticMarkup(children);
    const childrenHTML = { __html: markup };
    return (
      <div key={childrenContainerId} id={childrenContainerId} dangerouslySetInnerHTML={childrenHTML} />
    );
  }

  renderMetatags() {
    const { metatags } = this.props;
    return metatags.map((props, index) => {
      return <meta key={index} {...props} />;
    });
  }

  renderLinkedStylesheet(href) {
    return (
      <link key={href} rel="stylesheet" href={href} />
    );
  }

  renderInlineStyle(css) {
    const cssHTML = { __html: css };
    return (
      <style key={css} dangerouslySetInnerHTML={cssHTML} />
    );
  }

  renderSourcedScript(props) {
    return (
      <script {...props} />
    );
  }

  renderInlineScript(js) {
    const scriptHTML = { __html: js };
    return (
      <script key={js} dangerouslySetInnerHTML={scriptHTML} />
    );
  }

  renderStylesheets() {
    const { stylesheets } = this.props;
    return stylesheets.map(props => {
      const linkProps = typeof props === 'string' ? { href: props } : props;
      const renderedTag = linkProps.inline ?
        this.renderInlineStyle(linkProps.inline) :
        this.renderLinkedStylesheet(linkProps.href);
      return renderedTag;
    });
  }

  renderState() {
    if ( !this.props.state ) return null;
    const { state, stateKey } = this.props;
    return <div id={stateKey} data-state={JSON.stringify(state)} />;
  }

  renderUserScripts() {
    const { scripts } = this.props;
    return scripts.map(props => {
      const scriptProps = typeof props === 'string' ? { src: props } : props;
      const renderedTag = scriptProps.inline ?
        this.renderInlineScript(scriptProps.inline) :
        this.renderSourcedScript(scriptProps);
      return renderedTag;
    });
  }

  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <title>{this.props.title}</title>
          {this.renderMetatags()}
          {this.renderStylesheets()}
        </head>
        <body>
          {this.renderChildren()}
          {this.renderState()}
          {this.renderUserScripts()}
        </body>
      </html>
    );
  }
}

HTMLDocument.propTypes = {
  childrenContainerId: PropTypes.string,
  children: PropTypes.node,
  htmlAttributes: PropTypes.object,
  metatags: PropTypes.array,
  scripts: PropTypes.array,
  state: PropTypes.object,
  stateKey: PropTypes.string,
  stylesheets: PropTypes.array,
  title: PropTypes.string
};

HTMLDocument.defaultProps = {
  childrenContainerId: 'app',
  htmlAttributes: {},
  metatags: [],
  scripts: [],
  state: null,
  stateKey: '__state',
  stylesheets: [],
  title: ''
};


export default HTMLDocument;
