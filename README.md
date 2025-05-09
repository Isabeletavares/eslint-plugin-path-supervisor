# eslint-plugin-path-supervisor

An ESLint plugin to enforce rules related to absolute and relative path usage, public API imports in projects.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-path-supervisor`:

```sh
npm install eslint-plugin-path-supervisor --save-dev
```

## Usage

Add `path-supervisor` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "path-supervisor"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "path-supervisor/rule-name": ["error",{}]
    }
}
```

## Configurations

This plugin does not offer any predefined configurations. 
You will need to manually configure the rules you want to apply in your `.eslintrc` file.

**Example configuration**:
```json
{
  "rules": {
    "path-supervisor/path-supervisor": ["error", { "alias": "@" }],
    "path-supervisor/layer-imports": [
      "error",
      {
        "alias": "@",
        "ignoreImportPatterns": ["**/StoreProvider", "**/testing"]
      }
    ],
    "path-supervisor/public-api-imports": [
      "error",
      {
        "alias": "@",
        "testFilesPatterns": [
          "**/*.test.*",
          "**/*.testing.ts",
          "**/*.story.*",
          "**/*.stories.tsx",
          "**/StoreDecorator.tsx"
        ]
      }
    ]
  }
}
```


## Rules

### `path-supervisor/layer-imports`

**Type**: problem.


This rule enforces strict import rules between project layers. It ensures that only valid imports from underlying layers are allowed, based on a defined architecture.
#### Rule Details

**Incorrect:**
The layer-imports rule ensures that files from specific layers (e.g., `app`, `entities`, `features`, `widgets`) only import from underlying or shared layers according to your project’s structure. 
For example, a `features` file can import from `shared` or `entities` but not from `widgets` or `pages`.



### `path-supervisor/path-supervisor`

**Type**: problem.

This rule enforces that within the same "slice" of the project, all imports must use relative paths.

#### Rule Details
The `path-supervisor` rule ensures that all paths within a single slice (e.g., `entities/Article`) are relative. 
This prevents the use of absolute imports within the same module or feature slice.

If an absolute path is detected within the same slice, the rule can automatically fix it by replacing it with a relative path.

### `path-supervisor/public-api-imports`

**Type**: problem

This rule enforces that absolute imports are only allowed from the Public API (`index.ts`) of each module, and test-related imports should be sourced from `publicApi/testing.ts`.

#### Rule Details
- Absolute imports from a module should only come from its Public API (`index.ts`). If a deeper file is imported directly, this rule will flag an error.
- Test-related data or utilities must be imported from the `testing` file within the module's public API (e.g., `publicApi/testing.ts`), and only test files (e.g., files matching patterns like `**/*.test.*`) are allowed to import from this location.


The rule will automatically fix violations by replacing the import path with the appropriate public API path if possible

## Why Use These Rules?
- `layer-imports`: Helps enforce a well-defined project architecture by restricting imports between layers, improving project scalability and maintainability.
- `path-supervisor`: Ensures consistency by enforcing relative paths within the same slice, making code more readable and modular.
- `public-api-imports`: Promotes encapsulation by restricting access to internal files and enforcing imports from the public API, while also ensuring that test utilities are used appropriately.


