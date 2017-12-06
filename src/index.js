import { Component } from 'preact';
import applyPolyfills from './util/polyfill';
import App from './App.tsx';
import Error from './Error.tsx';

applyPolyfills();

let indexName = '';

if (typeof window !== 'undefined') {
  const url = new URLSearchParams(window.location.search);
  indexName = url.get('i');
  const themeColor = url.get('color');
  document.body.style.setProperty('--color', themeColor);
}

export default class Index extends Component {
  render() {
    return indexName === null ? <Error /> : <App indexName={indexName} />;
  }
}
