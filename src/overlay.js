'use strict';

const React = require('react');
const noop = require('lodash/utility/noop');
const assign = require('lodash/object/assign');

const styles = require('./styles');

class Overlay extends React.Component {
  constructor(){
    this.tabListener = this.tabListener.bind(this);
    this.bodyListener = this.bodyListener.bind(this);
  }

  // TODO: complete
  // from http://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/
  tabListener(evt){
    const container = React.findDOMNode(this);

    if(!this.props.shown){
      return;
    }

    if(!container.contains(evt.target)){
      evt.stopPropagation();
      container.focus();
    }
  }

  bodyListener(evt){
    const container = React.findDOMNode(this._container);

    if(!this.props.shown){
      return;
    }

    if(!container){
      this.props.hide();
      return;
    }

    if(container === evt.target || !container.contains(evt.target)){
      this.props.hide();
    }
  }

  componentDidMount(){
    const container = React.findDOMNode(this);

    document.body.addEventListener('click', this.bodyListener, false);
    document.addEventListener('focus', this.tabListener, true);

    if(container){
      this.props.renderer(container);
    }
  }

  componentDidUpdate(){
    const container = React.findDOMNode(this);

    if(container){
      this.props.renderer(container);
    }
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.bodyListener);
    document.removeEventListener('focus', this.tabListener);
  }

  render(){
    let style = {};

    if(this.props.shown){
      style.display = 'flex';
    } else {
      style.display = 'none';
    }

    if(this.props.backdrop){
      assign(style, styles.backdrop);
    }

    assign(style, styles.overlay);

    return (
      <div style={style}></div>
    );
  }
}

Overlay.defaultProps = {
  hide: noop,
  show: noop,
  renderer: noop
};

module.exports = Overlay;
