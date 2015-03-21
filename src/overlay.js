'use strict';

const React = require('react');
const noop = require('lodash/utility/noop');
const assign = require('lodash/object/assign');

const styles = require('./styles');

class Overlay extends React.Component {
  constructor(){
    this.bodyListener = this.bodyListener.bind(this);
  }

  bodyListener(evt){
    var container = React.findDOMNode(this._container);

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
    const container = React.findDOMNode(this._container);

    document.body.addEventListener('click', this.bodyListener, false);

    if(container){
      this.props.renderer(container);
    }
  }

  componentDidUpdate(){
    const container = React.findDOMNode(this._container);

    if(container){
      this.props.renderer(container);
    }
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.bodyListener);
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
      <div style={style} ref={(ref) => this._container = ref}></div>
    );
  }
}

Overlay.defaultProps = {
  hide: noop,
  show: noop,
  renderer: noop
};

module.exports = Overlay;
