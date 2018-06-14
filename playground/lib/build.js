import addPathData from 'metalsmith-paths';
import compileCss from './compile-css';
import createIndex from './create-index';
import compileHtml from './compile-html';
import compileJs from './compile-js';
import liveServer from './live-server';
import metalsmith from 'metalsmith';

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
    .use(compileHtml())
    .use(compileCss())
    .use(compileJs())
    .use(createIndex());

  pipeline.build(err => {
    console.info(err);
  });
}

const Build = {
  run,
};

export default Build;
