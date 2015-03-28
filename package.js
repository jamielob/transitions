Package.describe({
  name: 'jamielob:transitions',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Easy to use CSS3 transitions between templates.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.5');
  api.use(['templating'], 'client');
  api.addFiles(['client/transitions.js','client/transitions.css']);
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('jamielob:transitions');
//   api.addFiles('transitions-tests.js');
// });
