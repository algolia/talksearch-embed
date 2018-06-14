const search = instantsearch({
  appId: '8J7GPSC0XN',
  apiKey: '{{apiKey}}',
  indexName: '{{indexName}}',
  searchParameters: {
    hitsPerPage: 21,
    highlightPreTag: '<span class="ats-highlight">',
    highlightPostTag: '</span>',
    attributesToSnippet: ['caption.content:8'],
  },
});
