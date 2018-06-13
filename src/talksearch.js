/* eslint-disable import/no-commonjs */
import get from 'lodash-es/get';

function highlight(hit, key) {
  return get(hit, `_highlightResult.${key}.value`);
}
function formatNumber(number) {
  if (number < 1000) {
    return number;
  }
  return `${Math.ceil(number / 1000)}k`;
}

function hitTemplate(item) {
  const video = item.video;
  const title = highlight(item, 'video.title');
  const thumbnail = video.thumbnails.high.url;
  const authorName = highlight(item, 'author.name');
  const conferenceYear = item.conference.year;
  const viewCount = formatNumber(video.popularity.views);

  // Display a caption only if it matches
  const captionSnippetBase = get(item, '_snippetResult.caption.content');
  let captionMatch;
  if (get(captionSnippetBase, 'matchLevel') !== 'none') {
    captionMatch = get(captionSnippetBase, 'value');
  }

  const url = get(item, 'caption.url');

  const renderedViews = `
    <div class="absolute pin-r pin-t p-0x text--1 text-white bg-black-75">
      ${viewCount} views
    </div>`;

  let renderedCaption = '';
  if (captionMatch) {
    renderedCaption = `
      <div class="overflow-hidden absolute pin-b pin-x h-2x">
        <div 
          class="absolute z-1 bg-blur pin bg-no-repeat bg-cover bg-center-bottom" 
          style="background-image:url(${thumbnail})"
        ></div>
      </div>
      <div class="hit-captions absolute z-2 pin-b pin-x h-2x flrnw flc text-white text-1 bold text-outline text-center">
        <div>${captionMatch}</div>
      </div>
      `;
  }

  return `
    <div class="px-1 pb-1+">
      <div class="flcnw">
        <a 
          class="fln bg-no-repeat bg-cover bg-center h-5 relative" 
          style="background-image:url(${thumbnail})"
          href="${url}"
          target="_blank"
        >
          ${renderedViews}
          ${renderedCaption}
        </a>
        <div class="fla">
          <div class="hit-title text-black bold text-2 py-0x leading-loose">${title}</div>
          <div class="text-gray">
            <span class="">${authorName}</span>
            in
            <span class="">${conferenceYear}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function emptyTemplate() {
  return `<div class="text-5 text-gray text-center pt-3">Sorry, no videos found.</div>`;
}

const TalkSearch = {
  templates: {
    hits: {
      item: hitTemplate,
      empty: emptyTemplate
    },
  },
};

export default TalkSearch;
