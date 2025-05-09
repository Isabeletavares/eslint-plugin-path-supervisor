function getImportLayer(importPath) {
    const segments = importPath?.split('/')
    return segments?.[0]
}

module.exports = {
    getImportLayer
}
