function makeLoadFuncAsync(loadFunc, path, onComplete) {
    return new Promise(resolve => loadFunc(path, asset => {
        onComplete?.(asset);
        resolve(asset);
    }));
}
export function loadImageAsync(fileName, onComplete) {
    return makeLoadFuncAsync(loadImage, `./assets/images/${fileName}`, onComplete);
}
export function loadSoundAsync(filePath, onComplete) {
    return makeLoadFuncAsync(loadSound, `./assets/audio/${filePath}`, onComplete);
}
export function loadFontAsync(fileName, onComplete) {
    return makeLoadFuncAsync(loadFont, `./assets/fonts/${fileName}`, onComplete);
}
export function loadModelAsync(fileName, onComplete) {
    return makeLoadFuncAsync(loadModel, `./assets/models/${fileName}`, onComplete);
}
export function loadStringsAsync(path, onComplete) {
    return makeLoadFuncAsync(loadStrings, path, onComplete);
}
export function loadJSONAsync(path, onComplete) {
    return makeLoadFuncAsync(loadJSON, path, onComplete);
}
//# sourceMappingURL=asset-loading.js.map