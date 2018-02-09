import { Component } from 'preact';

import applyPolyfills from './util/polyfill';
import App from './App.tsx';
import Error from './Error.tsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

applyPolyfills();

// const indexName = '';
let videoName = undefined;
let affiliation = true;
let autoplay = true;
// todo: enable when we find a solution
const accentEnabled = false;

if (typeof window !== 'undefined') {
  const url = new URLSearchParams(window.location.search);
  videoName = url.get('video');
  // assume affiliation should be shown, unless `affiliation=false`
  affiliation = url.get('affiliation') !== 'false';
  autoplay = url.get('autoplay') !== 'false';
}

export default class Index extends Component {
  state = {
    metadata: {},
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/:indexName"
            component={({ match: { params: { indexName } } }) => (
              <App
                indexName={indexName}
                videoName={videoName}
                affiliation={affiliation}
                autoplay={autoplay}
                accentEnabled={accentEnabled}
              />
            )}
          />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}
