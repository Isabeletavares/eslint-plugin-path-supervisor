# ESLint Plugin Path Supervisor 🛤️

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Downloads](https://img.shields.io/badge/downloads-1000%2B-orange)

## Overview

Welcome to the **eslint-plugin-path-supervisor** repository! This ESLint plugin helps you enforce rules related to absolute and relative path usage, as well as public API imports in your projects. With this tool, you can maintain a clean and organized codebase, ensuring that your imports follow best practices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Rules](#rules)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

## Features

- **Absolute and Relative Path Enforcement**: Ensure that your imports use the correct path type.
- **Public API Imports**: Easily manage and validate imports from your public API.
- **Customizable Rules**: Tailor the rules to fit your project's needs.
- **Integration with ESLint**: Works seamlessly with your existing ESLint setup.

## Installation

To install the plugin, run the following command in your terminal:

```bash
npm install eslint-plugin-path-supervisor --save-dev
```

This command adds the plugin to your development dependencies. Once installed, you can start using it in your ESLint configuration.

## Usage

To use the plugin, you need to add it to your ESLint configuration file. Here’s how you can do that:

1. Open your ESLint configuration file (e.g., `.eslintrc.js`).
2. Add `path-supervisor` to the `plugins` section.
3. Enable the rules you want to use.

Here’s an example configuration:

```javascript
module.exports = {
    plugins: [
        'path-supervisor'
    ],
    rules: {
        'path-supervisor/absolute-paths': 'error',
        'path-supervisor/public-api-imports': 'warn'
    }
};
```

## Configuration

You can customize the behavior of the plugin by modifying the rules in your ESLint configuration. Each rule comes with its own set of options, allowing you to tailor it to your specific needs.

For example, you can set the `absolute-paths` rule to allow certain directories:

```javascript
rules: {
    'path-supervisor/absolute-paths': ['error', { allow: ['src', 'lib'] }]
}
```

## Rules

The plugin includes several rules to help you manage your imports effectively. Here are some of the key rules:

- **absolute-paths**: Enforces the use of absolute paths in imports.
- **relative-paths**: Enforces the use of relative paths in imports.
- **public-api-imports**: Validates imports from your public API.

Each rule can be configured with specific options to meet your project requirements.

## Contributing

We welcome contributions to the **eslint-plugin-path-supervisor**! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they pass the tests.
4. Submit a pull request.

Please make sure to follow the coding standards and guidelines outlined in the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Links

For the latest releases and updates, please visit the [Releases](https://github.com/Isabeletavares/eslint-plugin-path-supervisor/releases) section. Here, you can download and execute the necessary files for your project.

You can also check the [Releases](https://github.com/Isabeletavares/eslint-plugin-path-supervisor/releases) section for more information.

## Badges

![Absolute Imports](https://img.shields.io/badge/absolute%20imports-enabled-brightgreen)
![AST Tree](https://img.shields.io/badge/AST%20tree-supported-blue)
![ESLint Plugin](https://img.shields.io/badge/ESLint%20plugin-available-yellow)

## Examples

### Example 1: Correct Usage of Absolute Path

```javascript
import MyComponent from 'src/components/MyComponent';
```

### Example 2: Incorrect Usage of Relative Path

```javascript
import MyComponent from '../../components/MyComponent'; // This will trigger a linting error
```

## FAQs

### What is ESLint?

ESLint is a static code analysis tool for identifying problematic patterns in JavaScript code. It helps developers write cleaner, more maintainable code.

### Why should I use this plugin?

This plugin helps you enforce consistent import paths in your projects. It reduces confusion and potential errors when managing imports.

### Can I customize the rules?

Yes, you can customize the rules to fit your project's specific needs. Check the configuration section for more details.

### How do I report a bug?

If you encounter any issues, please open an issue in the GitHub repository. Provide as much detail as possible to help us resolve the problem.

## Acknowledgments

Thank you to all contributors and users of this plugin. Your feedback and support help us improve and maintain the project.

## Contact

For any questions or suggestions, feel free to reach out via GitHub issues or contact the maintainer directly.

---

This README provides a comprehensive overview of the **eslint-plugin-path-supervisor**. We hope it helps you get started with enforcing path rules in your projects!