function makeLoadFuncAsync(loadFunc, path, onComplete) {
    return new Promise(resolve => loadFunc(path, asset => {
        onComplete?.(asset);
        resolve(asset);
    }));
}
export function loadImageAsync(path, onComplete) {
    return makeLoadFuncAsync(loadImage, path, onComplete);
}
export function loadStringsAsync(path, onComplete) {
    return makeLoadFuncAsync(loadStrings, path, onComplete);
}
export function loadJSONAsync(path, onComplete) {
    return makeLoadFuncAsync(loadJSON, path, onComplete);
}
export function loadFontAsync(path, onComplete) {
    return makeLoadFuncAsync(loadFont, path, onComplete);
}
export function loadSoundAsync(path, onComplete) {
    return makeLoadFuncAsync(loadSound, path, onComplete);
}
export function loadModelAsync(path, onComplete) {
    return makeLoadFuncAsync(loadModel, path, onComplete);
}
//# sourceMappingURL=asset-loading.js.map