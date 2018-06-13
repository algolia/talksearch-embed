/* eslint-disable import/no-commonjs */
import autoprefixer from 'autoprefixer';
import cleancss from 'postcss-clean';
import postcss from 'postcss';
import fs from 'fs';
import pify from 'pify';
import purgecss from '@fullhuman/postcss-purgecss';
import tailwind from 'tailwindcss';
const readFile = pify(fs.readFile);
const writeFile = pify(fs.writeFile);

const srcPath = './src/talksearch.css';
const distPath = './dist/talksearch.min.css';
const tailwindConfig = './tailwind.config.js';

(async () => {
  const content = await readFile(srcPath);
  const postcssPlugins = [
    tailwind(tailwindConfig),
    // keep only classes starting with ais-
    purgecss({
      content: ['/dev/null'],
      whitelistPatterns: [/^ais-/],
    }),
    autoprefixer,
    cleancss(),
  ];

  const processor = postcss(postcssPlugins);
  const compiledContent = await processor.process(content, {
    from: srcPath,
    to: distPath,
  });

  await writeFile(distPath, compiledContent.css);
})();
