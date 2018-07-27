
Package.describe({
  name: 'cul:durian',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Admin Dashboard for meteor react',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/lucnat/durian',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.0.1');
  api.use('ecmascript');
  api.export('Whatup');
  api.mainModule('client.js','client');
  api.mainModule('server.js','server');
});

// external dependencies: Meteor, react-meteor-data, react, react-dom, dburles:mongo-collection-instances,accounts-base, accounts-password


Npm.depends({
  "react-json-editor-ajrm": "2.4.4",
  "react-router-dom": "4.3.1"
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
