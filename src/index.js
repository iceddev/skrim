'use strict';

const React = require('react');
const noop = require('lodash/utility/noop');
const assign = require('lodash/object/assign');

const Overlay = require('./overlay');

function skrim(app, opts, done){

  let renderer;
  let options = {
    shown: false,
    backdrop: true
  };

  function show(extraOptions){
    assign(options, { shown: true }, extraOptions);
    app.render();
  }

  function hide(){
    assign(options, { shown: false });
    app.render();
  }

  function render(fn, extraOptions){
    if(typeof fn === 'function'){
      renderer = fn;
    }

    show(extraOptions);
  }

  app.expose('overlay', {
    show: show,
    hide: hide,
    render: render
  });

  app.view('overlay', function(el, cb){
    let component = (
      <Overlay
        hide={hide}
        show={show}
        renderer={options.shown ? renderer : noop}
        {...options} />
    );

    React.render(component, el, cb);
  });

  done();
}

module.exports = skrim;
