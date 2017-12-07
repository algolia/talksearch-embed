import { Component } from 'preact';
import algoliasearch from 'algoliasearch';
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

const client = algoliasearch('FOQUAZ6YNS', '72ee3a317835b8618eda01c6fcc88f77');
const index = client.initIndex('METADATA');

export default class Index extends Component {
  state = {
    metadata: {},
  };

  async componentDidMount() {
    if (indexName) {
      this.setState({
        metadata: await index.getObject(indexName),
      });
    }
  }

  render() {
    return indexName === null ? (
      <Error />
    ) : (
      <App indexName={indexName} metadata={this.state.metadata} />
    );
  }
}
