'use strict';

const React = require('react');
const assign = require('lodash/object/assign');

const styles = require('./styles');

class Toast extends React.Component {
  constructor(){
    this.onClose = this.onClose.bind(this);
  }

  onClose(evt){
    if(typeof this.props.onClose === 'function'){
      this.props.onClose(evt);
    }
  }

  render(){
    const toastStyles = assign({}, styles.toast, this.props.style);
    const buttonStyles = assign({}, styles.closeToastButton, this.props.style);
    const closeLabel = `Close Toast: ${this.props.children}`;

    return (
      <div style={toastStyles}>
        {this.props.children}
        <button style={buttonStyles} onClick={this.onClose} aria-label={closeLabel}>&times;</button>
      </div>
    );
  }
}

module.exports = Toast;
