import instantsearch from 'instantsearch.js';
import _ from 'lodash';

function talksearch(userOptions) {
  const defaultOptions = {
    appId: '8J7GPSC0XN',
    apiKey: '28a29bbca9c6d43514d6654de6a8471c',
  };
  console.info(userOptions);

  const options = _.merge(defaultOptions, userOptions);
  return instantsearch(options);
}

export default talksearch;
