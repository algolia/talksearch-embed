/**
 * Hits
 **/
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: talksearch.templates.hits.item,
      empty: talksearch.templates.hits.empty,
    },
    cssClasses: {
      root: 'flrw',
      item: 'fln w-100 sm_w-50 lg_w-33',
    },
  })
);
