const KEY_MUSIC_VOLUME = 'music-volume';
const KEY_SFX_VOLUME = 'sfx-volume';
const KEY_HIGH_SCORE = 'high-score';
const SaveDataHelper = {
    getMusicVolume() { return getItem(KEY_MUSIC_VOLUME) ?? 0.25; },
    setMusicVolume(volume) { storeItem(KEY_MUSIC_VOLUME, volume); },
    getSFXVolume() { return getItem(KEY_SFX_VOLUME) ?? 0.25; },
    setSFXVolume(volume) { storeItem(KEY_SFX_VOLUME, volume); },
    getHighScore() { return getItem(KEY_HIGH_SCORE) ?? 0; },
    setHighScore(score) { storeItem(KEY_HIGH_SCORE, score); },
};
export default SaveDataHelper;
//# sourceMappingURL=save-data-helper.js.map