import metalsmith from 'metalsmith';
import debug from './plugins/debug';
import createHtml from './plugins/create-html';

function run() {
  metalsmith('.')
    .source('./playground/src')
    .destination('./playground/dist')
    .use(createHtml())
    .use(debug())
    .build(err => {
      console.info(err);
    });
}

const Build = {
  run,
};

export default Build;
