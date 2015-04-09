'use strict';

const React = require('react');

const styles = require('./styles');

class ToastContainer extends React.Component {

  render(){
    return (
      <div style={styles.toastContainer}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = ToastContainer;
