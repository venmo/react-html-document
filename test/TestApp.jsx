import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TestApp extends Component {
  render() {
    return (
      <span>
        {this.props.message}
      </span>
    );
  }
}

TestApp.propTypes = {
  message: PropTypes.string
};

export default TestApp;
