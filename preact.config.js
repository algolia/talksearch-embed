import preactCliTypeScript from 'preact-cli-plugin-typescript';
import CopyWebpackPlugin from 'copy-webpack-plugin';

/* eslint-disable no-param-reassign */
export default config => {
  preactCliTypeScript(config);
  config.node.process = 'mock';
  config.plugins.push(
    new CopyWebpackPlugin([{ context: `${__dirname}/assets`, from: `*.*` }])
  );
};
