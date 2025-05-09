function getCurrentFilePathSegments(currentFilePath) {
    const projectPath = currentFilePath?.split('src')[1];
    const segments = projectPath?.split('/')
    return segments;
}

module.exports = {
    getCurrentFilePathSegments
}
