/* eslint-disable no-param-reassign */
import metalsmithWatch from 'metalsmith-watch';
import pify from 'pify';

function plugin() {
  return async function liveServer(files, pipeline, next) {
    const watch = pify(
      metalsmithWatch({
        paths: {
          './playground/src/**/*': true,
          './playground/layouts/*.pug': '**/*',
        },
        livereload: false,
      })
    );

    await watch(files, pipeline);
    next();
  };
}

export default plugin;
