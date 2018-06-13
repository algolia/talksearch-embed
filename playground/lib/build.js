import metalsmith from 'metalsmith';
import addPathData from 'metalsmith-paths';
// import debug from './plugins/debug';
import compileCss from './plugins/compile-css';
import compileHtml from './plugins/compile-html';
import compileJs from './plugins/compile-js';
import createIndex from './plugins/create-index';
import liveServer from './plugins/live-server';

function run() {
  const isServe = process.env.WATCH;

  const pipeline = metalsmith('.')
    .source('./playground/src')
    .destination('./playground/dist')
    .use(addPathData());

  if (isServe) {
    pipeline.use(liveServer());
  }

  pipeline
    .use(createIndex())
    .use(compileHtml())
    .use(compileCss())
    .use(compileJs());

  pipeline.build(err => {
    console.info(err);
  });
}

const Build = {
  run,
};

export default Build;
