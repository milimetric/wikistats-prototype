const App = require('../src/App.vue');

describe('The main app', () => {
  it ('\'s default wiki should be Wikipedia All Langs', () => {
    expect(App.data().wiki).toEqual('Wikipedia (All languages)');
  });
});
