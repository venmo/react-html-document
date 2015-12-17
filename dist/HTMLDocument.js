'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var HTMLDocument = (function (_Component) {
  _inherits(HTMLDocument, _Component);

  function HTMLDocument() {
    _classCallCheck(this, HTMLDocument);

    _get(Object.getPrototypeOf(HTMLDocument.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(HTMLDocument, [{
    key: 'renderChildren',
    value: function renderChildren() {
      if (!this.props.children) return null;
      var _props = this.props;
      var children = _props.children;
      var childrenContainerId = _props.childrenContainerId;
      var state = _props.state;

      var markup = state ? _reactDomServer2['default'].renderToString(children) : _reactDomServer2['default'].renderToStaticMarkup(children);
      var childrenHTML = { __html: markup };
      return _react2['default'].createElement('div', { key: childrenContainerId, id: childrenContainerId, dangerouslySetInnerHTML: childrenHTML });
    }
  }, {
    key: 'renderMetatags',
    value: function renderMetatags() {
      var metatags = this.props.metatags;

      return metatags.map(function (props, index) {
        return _react2['default'].createElement('meta', _extends({ key: index }, props));
      });
    }
  }, {
    key: 'renderLinkedStylesheet',
    value: function renderLinkedStylesheet(href) {
      return _react2['default'].createElement('link', { key: href, rel: 'stylesheet', href: href });
    }
  }, {
    key: 'renderInlineStyle',
    value: function renderInlineStyle(css) {
      var cssHTML = { __html: css };
      return _react2['default'].createElement('style', { key: css, dangerouslySetInnerHTML: cssHTML });
    }
  }, {
    key: 'renderSourcedScript',
    value: function renderSourcedScript(src) {
      return _react2['default'].createElement('script', { key: src, src: src });
    }
  }, {
    key: 'renderInlineScript',
    value: function renderInlineScript(js) {
      var scriptHTML = { __html: js };
      return _react2['default'].createElement('script', { key: js, dangerouslySetInnerHTML: scriptHTML });
    }
  }, {
    key: 'renderStylesheets',
    value: function renderStylesheets() {
      var _this = this;

      var stylesheets = this.props.stylesheets;

      return stylesheets.map(function (props) {
        var linkProps = typeof props === 'string' ? { href: props } : props;
        var renderedTag = linkProps.inline ? _this.renderInlineStyle(linkProps.inline) : _this.renderLinkedStylesheet(linkProps.href);
        return renderedTag;
      });
    }
  }, {
    key: 'renderState',
    value: function renderState() {
      if (!this.props.state) return null;
      var _props2 = this.props;
      var state = _props2.state;
      var stateKey = _props2.stateKey;

      return _react2['default'].createElement('div', { id: stateKey, 'data-state': JSON.stringify(state) });
    }
  }, {
    key: 'renderUserScripts',
    value: function renderUserScripts() {
      var _this2 = this;

      var scripts = this.props.scripts;

      return scripts.map(function (props) {
        var scriptProps = typeof props === 'string' ? { src: props } : props;
        var renderedTag = scriptProps.inline ? _this2.renderInlineScript(scriptProps.inline) : _this2.renderSourcedScript(scriptProps.src);
        return renderedTag;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'html',
        this.props.htmlAttributes,
        _react2['default'].createElement(
          'head',
          null,
          _react2['default'].createElement(
            'title',
            null,
            this.props.title
          ),
          this.renderMetatags(),
          this.renderStylesheets()
        ),
        _react2['default'].createElement(
          'body',
          null,
          this.renderChildren(),
          this.renderState(),
          this.renderUserScripts()
        )
      );
    }
  }]);

  return HTMLDocument;
})(_react.Component);

HTMLDocument.propTypes = {
  childrenContainerId: _react.PropTypes.string,
  children: _react.PropTypes.node,
  htmlAttributes: _react.PropTypes.object,
  metatags: _react.PropTypes.array,
  scripts: _react.PropTypes.array,
  state: _react.PropTypes.object,
  stateKey: _react.PropTypes.string,
  stylesheets: _react.PropTypes.array,
  title: _react.PropTypes.string
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

exports['default'] = HTMLDocument;
module.exports = exports['default'];