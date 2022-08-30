const KEY_MUSIC_VOLUME = 'music-volume';
const KEY_SFX_VOLUME = 'sfx-volume';
const KEY_HIGH_SCORE = 'high-score';

const SaveDataHelper = {
  getMusicVolume(): number { return getItem(KEY_MUSIC_VOLUME) as number ?? 0.5; },
  setMusicVolume(volume: number): void { storeItem(KEY_MUSIC_VOLUME, volume); },

  getSFXVolume(): number { return getItem(KEY_SFX_VOLUME) as number ?? 0.5; },
  setSFXVolume(volume: number): void { storeItem(KEY_SFX_VOLUME, volume); },

  getHighScore(): number { return getItem(KEY_HIGH_SCORE) as number ?? 0; },
  setHighScore(score: number): void { storeItem(KEY_HIGH_SCORE, score); },
};

export default SaveDataHelper;
