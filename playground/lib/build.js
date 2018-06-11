import metalsmith from 'metalsmith';
import addPathData from 'metalsmith-paths';
// import debug from './plugins/debug';
import createIndex from './plugins/create-index';
import createHtml from './plugins/create-html';
import liveServer from './plugins/live-server';
import compileCss from './plugins/compile-css';
import compileJs from './plugins/compile-js';

function run(userOptions) {
  const options = {
    serve: false,
    ...userOptions,
  };

  const pipeline = metalsmith('.')
    .source('./playground/src')
    .destination('./playground/dist')
    .use(addPathData());

  if (options.serve) {
    pipeline.use(liveServer());
  }

  pipeline
    .use(createIndex())
    .use(createHtml())
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
