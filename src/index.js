import { Component } from 'preact';
import algoliasearch from 'algoliasearch';
import applyPolyfills from './util/polyfill';
import App from './App.tsx';
import Error from './Error.tsx';

applyPolyfills();

let indexName = '';
// todo: enable when we find a solution
const accentEnabled = false;

if (typeof window !== 'undefined') {
  const url = new URLSearchParams(window.location.search);
  indexName = url.get('i');
}

const client = algoliasearch('FOQUAZ6YNS', '72ee3a317835b8618eda01c6fcc88f77');
const index = client.initIndex('METADATA');

export default class Index extends Component {
  state = {
    metadata: {},
  };

  componentDidMount() {
    if (indexName) {
      index.getObject(indexName).then(metadata => {
        if (metadata.accentColor && accentEnabled) {
          document.body.style.setProperty('--color', metadata.accentColor);
        }

        this.setState({
          metadata,
        });
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
