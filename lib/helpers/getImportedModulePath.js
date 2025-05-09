function getImportedModulePath(node, alias) {
    const importPath = node.source.value;
    const importedModulePath = alias ? importPath.replace(`${alias}/`, '') : importPath;
    return importedModulePath;
}

module.exports = {
    getImportedModulePath
}
