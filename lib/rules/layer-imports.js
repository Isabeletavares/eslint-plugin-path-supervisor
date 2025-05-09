const path = require('path');
const {isPathRelative} = require('../helpers/isPathRelative');
const {getImportLayer} = require('../helpers/getImportLayer');
const micromatch = require('micromatch');
const {getImportedModulePath} = require("../helpers/getImportedModulePath");
const {getCurrentFilePath} = require("../helpers/getCurrentFilePath");
const {getCurrentFilePathSegments} = require("../helpers/getCurrentFilePathSegments");


module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "saf",
      category: "Fill me in",
      recommended: false,
      url: 'https://www.npmjs.com/package/eslint-plugin-ms-production-project-plugin', // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreImportPatterns: {
            type: 'array',
          }
        },
      }
    ],
  },

  create(context) {
    const layers = {
      'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
      'pages': ['widgets', 'features', 'shared', 'entities'],
      'widgets': ['features', 'shared', 'entities'],
      'features': ['shared', 'entities'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    }

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
      'pages': 'pages',
      'widgets': 'widgets',
    }


    const {alias = '', ignoreImportPatterns = []} = context.options[0] ?? {};

    const getCurrentFileLayer = () => {
      const normalizedCurrentFilePath =  getCurrentFilePath(context)
      const segments = getCurrentFilePathSegments(normalizedCurrentFilePath);
      return segments?.[1];
    }

    return {
      ImportDeclaration(node) {
        const importedModulePath = getImportedModulePath(node, alias);
        const currentFileLayer = getCurrentFileLayer()
        const importLayer = getImportLayer(importedModulePath)

        if(isPathRelative(importedModulePath)) {
          return;
        }

        if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
          return;
        }

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(importedModulePath, pattern)
        });

        if(isIgnored) {
          return;
        }

        if(!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(node, 'A layer can only import underlying layers (shared, entities, features, widgets, pages, app)');
        }
      }
    };
  },
};
