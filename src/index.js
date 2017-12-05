import { Component } from 'preact';
import App from './App.tsx';
let indexName = '';

if (typeof window !== 'undefined') {
  const url = new URLSearchParams(window.location.search);
  indexName = url.get('i');
  const themeColor = url.get('color');
  document.body.style.setProperty('--color', themeColor);
}

export default class Index extends Component {
  render() {
    return <App indexName={indexName} />;
  }
}
