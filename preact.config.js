import preactCliTypeScript from 'preact-cli-plugin-typescript';

/* eslint-disable no-param-reassign */
export default config => {
  preactCliTypeScript(config);
  config.node.process = 'mock';
};
