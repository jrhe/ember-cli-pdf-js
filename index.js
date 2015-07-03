/* jshint node: true */
'use strict';

var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-pdf-js',

  included: function(app) {
    app.import('vendor/pdf-js/l10n.js');
    app.import(app.bowerDirectory + '/pdfjs-dist/build/pdf.js');
    app.import(app.bowerDirectory + '/pdfjs-dist/web/compatibility.js');
  },

  contentFor: function(type, config) {
    if(type === 'head') {
      return '<link rel="resource" type="application/l10n" href="assets/ember-cli-pdf-js/locale/locale.properties"/>';
    }
  },

  treeForPublic: function(tree) {
    this._requireBuildPackages();

    if (!tree) {
      return tree;
    }

    var pdfJsWorkerTree = this.pickFiles(this.app.bowerDirectory + '/pdfjs-dist/build',{
      srcDir: '/',
      files: ['pdf.worker.js'],
      destDir: 'assets/' + this.moduleName()
    });

    var publicTree = this.pickFiles(tree, {
      srcDir: '/',
      destDir: 'assets/' + this.moduleName()
    });

    return mergeTrees([publicTree, pdfJsWorkerTree]);
  }
};
