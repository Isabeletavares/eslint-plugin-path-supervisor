/**
 * @fileoverview feature sliced relative path checker
 * @author MarynaShavlak
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'C:\\Users\\maryna\Desktop\\javascript\\production_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\maryna\\Desktop\\javascript\\production_project\\src\\entities\\Article\\ui\\ArticleDetails\\ArticleDetails.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: "Within a single slice, all paths must be relative."}],
      options: [
        {
          alias: '@'
        }
      ],
      output: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
    },
  ],

});



