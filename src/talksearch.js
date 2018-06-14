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
  const conferenceYear = get(item, 'conference.year');
  const viewCount = formatNumber(video.popularity.views);

  // Display a caption only if it matches
  const captionSnippetBase = get(item, '_snippetResult.caption.content');
  let captionMatch;
  if (get(captionSnippetBase, 'matchLevel') !== 'none') {
    captionMatch = get(captionSnippetBase, 'value');
  }

  const url = get(item, 'caption.url');

  const renderedViews = `
    <div class="ats-hit--views">
      ${viewCount} views
    </div>`;

  let renderedCaption = '';
  if (captionMatch) {
    renderedCaption = `
      <div class="ats-hit--captionBackdrop">
        <div 
          class="ats-hit--captionBlur" 
          style="background-image:url(${thumbnail})"
        ></div>
      </div>
      <div class="ats-hit--caption">
        <div>${captionMatch}</div>
      </div>
      `;
  }

  const renderedAuthorName = authorName
    ? `<span class="ats-hit--authorName">${authorName}</span>`
    : '';
  const renderedConferenceYear = conferenceYear
    ? `<span class="ats-hit--conferenceYear">${conferenceYear}</span>`
    : '';
  const videoSubtitle = authorName
    ? `${renderedAuthorName} in ${renderedConferenceYear}`
    : renderedConferenceYear;

  return `
    <div class="ats-hit--root">
      <a 
        class="ats-hit--thumbnail" 
        style="background-image:url(${thumbnail})"
        href="${url}"
        target="_blank"
      >
        ${renderedViews}
        ${renderedCaption}
      </a>
      <div class="ats-hit--details">
        <div class="ats-hit--videoTitle">${title}</div>
        <div class="ats-hit--videoSubtitle">${videoSubtitle}</div>
      </div>
    </div>
  `;
}

const TalkSearch = {
  templates: {
    hits: {
      item: hitTemplate,
    },
  },
};

export default TalkSearch;
