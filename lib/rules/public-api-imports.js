const {isPathRelative} = require("../helpers/isPathRelative");
const {getImportLayer} = require("../helpers/getImportLayer");
const micromatch = require("micromatch");
const path = require("path");
const {getImportedModulePath} = require("../helpers/getImportedModulePath");
const {getCurrentFilePath} = require("../helpers/getCurrentFilePath");

const PUBLIC_ERROR = 'PUBLIC_ERROR';
const TESTING_PUBLIC_ERROR = 'TESTING_PUBLIC_ERROR';

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "descr",
      category: "Fill me in",
      recommended: false,
      url: 'https://www.npmjs.com/package/eslint-plugin-ms-production-project-plugin', // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    messages: {
      [PUBLIC_ERROR]: 'Absolute import is only allowed from the Public API (index.ts)',
      [TESTING_PUBLIC_ERROR]: 'Test data needs to be imported from publicApi/testing.ts',
    },
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFilesPatterns: {
            type: 'array'
          }
        }
      }
    ],
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {};

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    return {
      ImportDeclaration(node) {
        const importedModulePath = getImportedModulePath(node, alias);
        if(isPathRelative(importedModulePath)) {
          return;
        }

        // [entities, article, model, types]
        const segments = importedModulePath.split('/')
        const layer = segments[0];
        const slice = segments[1];

        // const importLayer = getImportLayer(importedModulePath)

        if(!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;
        // [entities, article, testing]
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

        if(isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
            }
          });
        }

        if(isTestingPublicApi) {
          const normalizedCurrentFilePath =  getCurrentFilePath(context)

          const isCurrentFileTesting = testFilesPatterns.some(
              pattern => micromatch.isMatch(normalizedCurrentFilePath, pattern)
          )

          if(!isCurrentFileTesting) {
            context.report({
              node,
              messageId: TESTING_PUBLIC_ERROR,
            });
          }
        }
      }
    };
  },
};
