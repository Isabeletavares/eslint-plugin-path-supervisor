const path = require('path');

function getCurrentFilePath(context) {
    const currentFilePath = context.getFilename();
    const normalizedPath = path.toNamespacedPath(currentFilePath);
    return normalizedPath.split('\\').join('/');
}

module.exports = {
    getCurrentFilePath
}
