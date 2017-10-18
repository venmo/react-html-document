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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _constants = require('./constants');

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

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
      var universalState = _props.universalState;

      var markup = universalState ? _reactDomServer2['default'].renderToString(children) : _reactDomServer2['default'].renderToStaticMarkup(children);
      var childrenHTML = { __html: markup };
      return _react2['default'].createElement('div', { key: childrenContainerId, id: childrenContainerId, dangerouslySetInnerHTML: childrenHTML });
    }
  }, {
    key: 'renderFavicon',
    value: function renderFavicon() {
      var favicon = this.props.favicon;

      if (!favicon) return null;
      return _react2['default'].createElement('link', { rel: 'icon', href: favicon });
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
    key: 'renderInlineAsset',
    value: function renderInlineAsset(type, html) {
      var innerHTML = { __html: html };
      if (type === _constants.ASSET_TYPES.STYLESHEET) {
        return _react2['default'].createElement('style', { key: html, dangerouslySetInnerHTML: innerHTML });
      }
      return _react2['default'].createElement('script', { key: html, dangerouslySetInnerHTML: innerHTML });
    }
  }, {
    key: 'renderImportedAsset',
    value: function renderImportedAsset(type, props) {
      if (type === _constants.ASSET_TYPES.STYLESHEET) {
        return _react2['default'].createElement('link', _extends({ key: props.href, rel: 'stylesheet' }, props));
      }
      return _react2['default'].createElement('script', _extends({ key: props.src }, props));
    }
  }, {
    key: 'renderAsset',
    value: function renderAsset(type, props) {
      if (props.inline) {
        var html = props.inline;
        return this.renderInlineAsset(type, html);
      } else if (props.file) {
        var html = (0, _readFile2['default'])(props.file).contents;
        return this.renderInlineAsset(type, html);
      }
      return this.renderImportedAsset(type, props);
    }
  }, {
    key: 'renderStylesheets',
    value: function renderStylesheets() {
      var _this = this;

      var stylesheets = this.props.stylesheets;

      return stylesheets.map(function (props) {
        var stylesheetProps = typeof props === 'string' ? { href: props } : props;
        return _this.renderAsset(_constants.ASSET_TYPES.STYLESHEET, stylesheetProps);
      });
    }
  }, {
    key: 'renderScripts',
    value: function renderScripts() {
      var _this2 = this;

      var scripts = this.props.scripts;

      return scripts.map(function (props) {
        var scriptProps = typeof props === 'string' ? { src: props } : props;
        return _this2.renderAsset(_constants.ASSET_TYPES.SCRIPT, scriptProps);
      });
    }
  }, {
    key: 'renderUniversalStateScript',
    value: function renderUniversalStateScript() {
      if (!this.props.universalState) return null;
      var universalState = this.props.universalState;

      var stringifiedUniversalState = JSON.stringify(universalState);
      var innerHTML = { __html: stringifiedUniversalState };
      return _react2['default'].createElement('script', { id: _constants.STATE_SCRIPT_ID, type: 'application/json', dangerouslySetInnerHTML: innerHTML });
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
          this.renderFavicon(),
          this.renderStylesheets()
        ),
        _react2['default'].createElement(
          'body',
          null,
          this.renderChildren(),
          this.renderUniversalStateScript(),
          this.renderScripts()
        )
      );
    }
  }]);

  return HTMLDocument;
})(_react.Component);

HTMLDocument.propTypes = {
  childrenContainerId: _propTypes2['default'].string,
  children: _propTypes2['default'].node,
  htmlAttributes: _propTypes2['default'].object,
  favicon: _propTypes2['default'].string,
  metatags: _propTypes2['default'].array,
  scripts: _propTypes2['default'].array,
  stylesheets: _propTypes2['default'].array,
  title: _propTypes2['default'].string,
  universalState: _propTypes2['default'].object
};

HTMLDocument.defaultProps = {
  childrenContainerId: 'app',
  htmlAttributes: {},
  favicon: '',
  metatags: [],
  scripts: [],
  stylesheets: [],
  title: '',
  universalState: null
};

exports['default'] = HTMLDocument;
module.exports = exports['default'];
