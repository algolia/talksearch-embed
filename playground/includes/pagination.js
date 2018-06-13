/**
 * Pagination
 **/
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    maxPages: 20,
    cssClasses: {
      root: 'list-reset text-center my-1',
      item: 'inline-block bold mx-0x text-3',
      link:
        'text-black no-underline px-1 rounded-full hover_bg-purple hover_text-white',
      disabled: 'hidden',
    },
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false,
    showFirstLast: false,
  })
);
