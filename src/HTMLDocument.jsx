import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

import { STATE_SCRIPT_ID, ASSET_TYPES } from './constants';
import readFile from './readFile';


class HTMLDocument extends Component {

  renderChildren() {
    if ( !this.props.children ) return null;
    const { children, childrenContainerId, universalState } = this.props;
    const markup = universalState ?
      ReactDOM.renderToString(children) :
      ReactDOM.renderToStaticMarkup(children);
    const childrenHTML = { __html: markup };
    return (
      <div key={childrenContainerId} id={childrenContainerId} dangerouslySetInnerHTML={childrenHTML} />
    );
  }

  renderMetatags() {
    const { metatags } = this.props;
    return metatags.map((props, index) => <meta key={index} {...props} />);
  }

  renderInlineAsset(type, html) {
    const innerHTML = { __html: html };
    if ( type === ASSET_TYPES.STYLESHEET ) {
      return <style key={html} dangerouslySetInnerHTML={innerHTML} />;
    }
    return <script key={html} dangerouslySetInnerHTML={innerHTML} />;
  }

  renderImportedAsset(type, { src, href } ) {
    if ( type === ASSET_TYPES.STYLESHEET ) {
      return <link key={src} rel="stylesheet" href={href} />;
    }
    return <script key={src} src={src} />;
  }

  renderAsset(type, props) {
    if ( props.inline ) {
      const html = props.inline;
      return this.renderInlineAsset(type, html);
    } else if ( props.file ) {
      const html = readFile(props.file).contents;
      return this.renderInlineAsset(type, html);
    }
    return this.renderImportedAsset(type, props);
  }

  renderStylesheets() {
    const { stylesheets } = this.props;
    return stylesheets.map(props => {
      const stylesheetProps = typeof props === 'string' ? { href: props } : props;
      return this.renderAsset(ASSET_TYPES.STYLESHEET, stylesheetProps);
    });
  }

  renderScripts() {
    const { scripts } = this.props;
    return scripts.map(props => {
      const scriptProps = typeof props === 'string' ? { src: props } : props;
      return this.renderAsset(ASSET_TYPES.SCRIPT, scriptProps);
    });
  }

  renderUniversalStateScript() {
    if ( !this.props.universalState ) return null;
    const { universalState } = this.props;
    const stringifiedUniversalState = JSON.stringify(universalState);
    const innerHTML = { __html: stringifiedUniversalState };
    return <script id={STATE_SCRIPT_ID} type="application/json" dangerouslySetInnerHTML={innerHTML}/>;
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
          {this.renderUniversalStateScript()}
          {this.renderScripts()}
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
  stylesheets: PropTypes.array,
  title: PropTypes.string,
  universalState: PropTypes.object
};

HTMLDocument.defaultProps = {
  childrenContainerId: 'app',
  htmlAttributes: {},
  metatags: [],
  scripts: [],
  stylesheets: [],
  title: '',
  universalState: null
};


export default HTMLDocument;
