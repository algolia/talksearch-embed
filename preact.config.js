import { resolve } from 'path';
import preactCliTypeScript from 'preact-cli-plugin-typescript';

/* eslint-disable no-param-reassign */
export default config => {
  preactCliTypeScript(config);
  config.resolve.alias['preact-cli-entrypoint'] = resolve(
    __dirname,
    'src',
    'index.tsx'
  );

  config.node.process = 'mock';
};
