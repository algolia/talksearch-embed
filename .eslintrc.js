module.exports = {
  extends: ['algolia', 'algolia/jest'],
  globals: {
    '__rewire_reset_all__': true,
    'instantsearch': true,
    'search': true,
    'talksearch': true
  },
  rules: {
    'no-console': 0,
  }
};
