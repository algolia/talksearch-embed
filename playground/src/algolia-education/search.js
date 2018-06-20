// include: instanciate.js
// include: searchbox.js
/**
 * Language selection
 **/
search.addWidget(
  instantsearch.widgets.menu({
    container: '#custom_menu_1',
    attributeName: 'language',
  })
);
// include: hits.js
// include: pagination.js

search.start();
