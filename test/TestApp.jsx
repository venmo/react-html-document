import React, { Component, PropTypes } from 'react';


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
