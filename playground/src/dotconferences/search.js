// include: instanciate.js
// include: searchbox.js
/**
 * Menus
 **/
const menuTemplates = {
  item: function item(options) {
    const additionalClasses = options.isRefined
      ? 'text-black bg-yellow hover_underline'
      : 'hover_bg-yellow hover_text-black';
    const cssClasses = `rounded-full px-1 py-0x ${additionalClasses}`;

    return `<div class="${cssClasses}">${options.label}</div>`;
  },
};
const menuCssClasses = {
  body: 'text-center',
  item: 'inline-block cursor-pointer mx-0x',
};

search.addWidget(
  instantsearch.widgets.menu({
    container: '#conferences',
    attributeName: 'conference.name',
    sortBy: ['count'],
    templates: menuTemplates,
    cssClasses: menuCssClasses,
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#years',
    attributeName: 'conference.year',
    sortBy: ['name:desc'],
    templates: menuTemplates,
    cssClasses: menuCssClasses,
  })
);

// include: hits.js
// include: pagination.js

search.start();
