/**
 * Searchbox
 **/
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search by topic, year, speaker or any sentence',
    poweredBy: false,
    wrapInput: false,
    loadingIndicator: false,
  })
);
