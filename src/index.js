import { Component } from 'preact';
import App from './App.tsx';

const indexName =
  typeof window !== 'undefined' ? window.location.search.substr(1) : '';

export default class Index extends Component {
  render() {
    return <App indexName={indexName} />;
  }
}
