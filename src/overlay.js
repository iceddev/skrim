'use strict';

const React = require('react');
const assign = require('lodash/object/assign');

const styles = require('./styles');

class Overlay extends React.Component {
  constructor(){
    this.state = {
      display: 'none'
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.content = this.content.bind(this);
    this.bodyListener = this.bodyListener.bind(this);
  }

  bodyListener(evt){
    var el = React.findDOMNode(this._child);
    if(el && !el.contains(evt.target)){
      this.hide();
    }
  }

  componentDidMount(){
    document.body.addEventListener('click', this.bodyListener, false);
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.bodyListener);
  }

  content(component){
    const clonedComponent = React.cloneElement(component, {
      ref: (ref) => this._child = ref
    });

    this.setState({
      component: clonedComponent
    });
  }

  show(options){
    let style = {
      display: 'flex'
    };

    if(options.backdrop){
      assign(style, {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      });
    }

    this.setState({
      style: style
    });
  }

  hide(){
    let style = {
      display: 'none'
    };

    this.setState({
      style: style
    });
  }

  render(){
    return (
      <div style={assign(styles.overlay, this.state.style)}>
        {this.state.component}
      </div>
    );
  }
}

module.exports = Overlay;
