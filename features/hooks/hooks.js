/**
 * Example of using cucumber-js hooks. 
 * https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md
 */
const { BeforeAll, Before, After, AfterAll } = require('cucumber');

// Before all features start
BeforeAll(function() {
  console.log('Before everything');
});

Before(function(scenario) {
  console.log(`Before ${JSON.stringify(scenario.pickle.name)}`);
});

After(function(scenario) {
  console.log(`After ${JSON.stringify(scenario.pickle.name)}`);
});

// After all features are complete
AfterAll(function() {
  console.log('All done!');
});
