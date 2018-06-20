/**
 * Searchbox
 **/
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: '{{inputPlaceholder}}',
    poweredBy: false,
    wrapInput: false,
    loadingIndicator: false,
  })
);
