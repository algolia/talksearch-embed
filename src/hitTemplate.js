/* eslint-disable import/no-commonjs */
import _ from 'lodash';

/**
 * Returns the highlighted version of the specified key. Defaults to the actual
 * key if not highlighted version found
 * @param {Object} hit The hit object as returned by the Algolia API
 * @param {String} key The path to the key
 * @returns {String} The highlighted key if possible
 **/
function highlight(hit, key) {
  return _.get(hit, `_highlightResult.${key}.value`, _.get(hit, key));
}

/**
 * Format a number with k-suffix
 * @param {Number} number The input number
 * @returns {String} The formatted number
 **/
function formatNumber(number) {
  if (number < 1000) {
    return `${number}`;
  }
  return `${Math.floor(number / 1000)}k`;
}

/**
 * Returns the thumbnail url
 * @param {Object} hit The hit object as returned by the Algolia API
 * @returns {String} The thumbnail url
 **/
function getThumbnail(hit) {
  return _.get(hit, 'video.thumbnails.high.url');
}

/**
 * Returns an HTML element containing the number of views
 * @param {Object} hit The hit object as returned by the Algolia API
 * @returns {String} The HTML element
 **/
function renderViews(hit) {
  const rawViewCount = _.get(hit, 'video.popularity.views');
  const viewCount = formatNumber(rawViewCount);
  return `<div class="ats-hit--views">${viewCount} views</div>`;
}

/**
 * Returns an HTML element containing the highlighted caption
 * @param {Object} hit The hit object as returned by the Algolia API
 * @returns {String} The HTML element, or an empty string if no caption found
 **/
function renderCaption(hit) {
  // Check that there is a match in the caption
  const matchType = _.get(
    hit,
    '_snippetResult.caption.content.matchLevel',
    'none'
  );
  if (matchType === 'none') {
    return '';
  }

  const captionValue = _.get(hit, '_snippetResult.caption.content.value');
  const thumbnail = getThumbnail(hit);

  return `
  <div class="ats-hit--captionBackdrop">
    <div 
      class="ats-hit--captionBlur"
      style="background-image:url(${thumbnail})"
    ></div>
  </div>
  <div class="ats-hit--caption">
    <div>${captionValue}</div>
  </div>`;
}

/**
 * Returns an HTML element containing all speaker names
 * @param {Object} hit The hit object as returned by the Algolia API
 * @returns {String} The HTML element
 **/
function renderSpeakers(hit) {
  const speakers = _.map(_.get(hit, 'speakers', []), 'name');
  if (_.isEmpty(speakers)) {
    return '';
  }
  const renderedSpeakers = _.map(
    speakers,
    speakerName => `<span class="ats-hit--speakerName">${speakerName}</span>`
  ).join(', ');
  return `<span class="ats-hit--speakers">${renderedSpeakers}</span>`;
}

/**
 * Returns an HTML element containing the conference year
 * @param {Object} hit The hit object as returned by the Algolia API
 * @returns {String} The HTML element
 **/
function renderConferenceYear(hit) {
  const conferenceYear = _.get(hit, 'conference.year');
  if (!conferenceYear) {
    return '';
  }
  return `<span class="ats-hit--conferenceYear">${conferenceYear}</span>`;
}

/**
 * Returns an HTML element containing the video subtitle (speakers and year)
 * @param {Object} hit The hit object as returned by the Algolia API
 * @returns {String} The HTML element
 **/
function renderVideoSubtitle(hit) {
  const speakers = renderSpeakers(hit);
  const conferenceYear = renderConferenceYear(hit);
  const renderedContent = _.compact([speakers, conferenceYear]).join(' in ');
  return `<div class="ats-hit--videoSubtitle">${renderedContent}</div>`;
}

function hitTemplate(item) {
  const thumbnail = getThumbnail(item);
  const url = _.get(item, 'caption.url');
  const title = highlight(item, 'video.title');
  const renderedViews = renderViews(item);
  const renderedCaption = renderCaption(item);
  const renderedSubtitle = renderVideoSubtitle(item);

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
        <a class="ats-hit--videoTitle" href="${url}">${title}</a>
        ${renderedSubtitle}
      </div>
    </div>
  `;
}

hitTemplate.internals = {
  highlight,
  formatNumber,
  getThumbnail,
  renderViews,
  renderCaption,
  renderSpeakers,
  renderConferenceYear,
  renderVideoSubtitle,
};

export default hitTemplate;
