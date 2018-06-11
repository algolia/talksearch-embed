const search = instantsearch({
  appId: '8J7GPSC0XN',
  apiKey: '28a29bbca9c6d43514d6654de6a8471c',
  indexName: 'takeoffconference',
  routing: true,
  searchParameters: {
    hitsPerPage: 21,
    facetingAfterDistinct: true,
    highlightPreTag: '<span class="highlight">',
    highlightPostTag: '</span>',
    attributesToSnippet: ['caption.content:8'],
    explain: '*',
  },
});

/**
 * Searchbar
 **/
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
    placeholder: 'Search by topic, year, speaker or any sentence',
    autofocus: false,
    poweredBy: false,
    magnifier: {
      cssClasses: {
        root:
          'hidden sm_block absolute pin-y pin-l w-1 sm_w-2 ml-1 text-white fill-current',
      },
    },
    reset: {
      cssClasses: {
        root:
          'hidden sm_block absolute pin-y pin-r w-2 mr-1 text-white-75 fill-current',
      },
    },
    lwrapInput: false,
    loadingIndicator: false,
  })
);

/**
 * Hits
 **/
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      allItems(results) {
        const renderedHits = _.map(results.hits, renderHit).join(' ');
        return `<div class="flrw ">${renderedHits}</div>`;
      },
      empty() {
        return `<div class="text-5 text-gray text-center pt-3">Sorry, no videos found.</div>`;
      },
    },
  })
);

function highlight(hit, key) {
  return _.get(hit, `_highlightResult.${key}.value`);
}
function formatNumber(number) {
  if (number < 1000) {
    return number;
  }
  return `${Math.ceil(number / 1000)}k`;
}
function renderHit(item) {
  const video = item.video;
  const title = highlight(item, 'video.title');
  const thumbnail = video.thumbnails.high.url;
  const authorName = highlight(item, 'author.name');
  const conferenceYear = item.conference.year;
  const viewCount = formatNumber(video.popularity.views);

  // Display a caption only if it matches
  const captionSnippetBase = _.get(item, '_snippetResult.caption.content');
  let captionMatch;
  if (_.get(captionSnippetBase, 'matchLevel') !== 'none') {
    captionMatch = _.get(captionSnippetBase, 'value');
  }

  const url = _.get(item, 'caption.url');

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
    <div class="fln w-100 sm_w-50 lg_w-33 px-1 pb-1x">
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

/**
 * Pagination
 **/
const paginationContainer = document.querySelector('#pagination');
search.addWidget(
  instantsearch.widgets.pagination({
    container: paginationContainer,
    maxPages: 20,
    cssClasses: {
      root: 'list-reset text-center my-1',
      item: 'inline-block bold mx-0x text-3',
      link:
        'text-black no-underline px-1 rounded-full hover_bg-paua hover_text-white',
      disabled: 'hidden',
    },
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false,
    showFirstLast: false,
  })
);
function hidePaginationIfOnlyOnePage(results) {
  paginationContainer.classList.toggle('hidden', results.nbPages === 1);
}

search.start();

search.helper.on('result', hidePaginationIfOnlyOnePage);
