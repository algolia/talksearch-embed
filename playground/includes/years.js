/**
 * Years selection
 **/
search.addWidget(
  instantsearch.widgets.menu({
    container: '#years',
    attributeName: 'conference.year',
    sortBy: ['name:desc'],
    // templates: menuTemplates,
    // cssClasses: menuCssClasses,
  })
);
