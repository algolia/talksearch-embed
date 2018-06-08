import metalsmith from 'metalsmith';
import debug from './plugins/debug';
import createHtml from './plugins/create-html';
import liveServer from './plugins/live-server';

function run(userOptions) {
  const options = {
    serve: false,
    ...userOptions,
  };

  const pipeline = metalsmith('.')
    .source('./playground/src')
    .destination('./playground/dist');

  if (options.serve) {
    pipeline.use(liveServer());
  }

  pipeline.use(createHtml());

  pipeline.build(err => {
    console.info(err);
  });
}

const Build = {
  run,
};

export default Build;
