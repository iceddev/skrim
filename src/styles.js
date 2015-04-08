'use strict';

const styles = {
  overlay: {
    position: 'fixed'
  },
  container: {
    display: 'flex'
  },
  backdrop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  toastContainer: {
    top: 60,
    right: 0,
    position: 'fixed'
  },
  toast: {
    padding: 10,
    minWidth: 150,
    borderRadius: 2,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  closeToastButton: {
    background: 'none',
    border: 0,
    color: 'white',
    fontSize: '1.2em',
    padding: 0,
    margin: 0,
    float: 'right',
    lineHeight: 0.8,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 20
  }
};

module.exports = styles;
