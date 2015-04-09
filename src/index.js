'use strict';

const React = require('react');
const noop = require('lodash/utility/noop');
const delay = require('lodash/function/delay');
const remove = require('lodash/array/remove');
const assign = require('lodash/object/assign');

const Toast = require('./toast');
const Overlay = require('./overlay');
const ToastContainer = require('./toast-container');

function skrim(app, _, done){

  let renderer;
  let toasts = [];
  let options = {
    shown: false,
    backdrop: true
  };

  function showOverlay(opts){
    assign(options, { shown: true }, opts);
    app.render();
  }

  function hideOverlay(){
    assign(options, { shown: false });
    app.render();
  }

  function renderOverlay(fn, opts){
    if(typeof fn === 'function'){
      renderer = fn;
    }

    showOverlay(opts);
  }

  function clearToast(component){
    remove(toasts, component);
    app.render();
  }

  function clearToasts(){
    toasts = [];
    app.render();
  }

  function showToast(message, opts = {}){
    if(typeof message === 'string'){
      const idx = toasts.length;
      const component = (
        <Toast key={idx} style={opts.style} onClose={() => clearToast(component)}>{message}</Toast>
      );
      toasts.push(component);
      app.render();

      if(opts.timeout){
        delay(clearToast, opts.timeout, component);
      }
    }
  }

  app.expose('overlay', {
    show: showOverlay,
    hide: hideOverlay,
    render: renderOverlay
  });

  app.expose('toast', {
    show: showToast,
    clear: clearToasts
  });

  app.view('overlay', function(el, cb){
    let component = (
      <div>
        <ToastContainer>
          {toasts}
        </ToastContainer>
        <Overlay
          hide={hideOverlay}
          show={showOverlay}
          renderer={options.shown ? renderer : noop}
          {...options} />
      </div>
    );

    React.render(component, el, cb);
  });

  done();
}

module.exports = skrim;
