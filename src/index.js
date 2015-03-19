'use strict';

const React = require('react');

const Overlay = require('./overlay');

function skrim(app, opts, done){

  let rendered;

  function show(options){
    if(rendered && typeof rendered.show === 'function'){
      rendered.show(options || {});
    }
  }

  function hide(){
    if(rendered && typeof rendered.hide === 'function'){
      rendered.hide();
    }
  }

  function content(component){
    if(rendered && typeof rendered.content === 'function'){
      rendered.content(component);
    }
  }

  app.expose('overlay', {
    show: show,
    hide: hide,
    content: content
  });

  app.view('overlay', function(el, cb){
    rendered = React.render(<Overlay />, el, cb);
  });

  done();
}

module.exports = skrim;
