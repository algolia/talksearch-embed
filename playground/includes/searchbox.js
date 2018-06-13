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
  })
);
