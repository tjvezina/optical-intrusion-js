import AssetManager from './framework/asset-manager.js';
import ViewManager from './framework/view-manager/view-manager.js';
import SaveDataHelper from './io/save-data-helper.js';
import GameView from './views/game-view.js';
import SplashView from './views/splash-view.js';

export const CANVAS_SCALE = 2;

let imgBackground: p5.Image;
let backgroundOffset = 0;
let music: p5.SoundFile;

globalThis.setup = function (): void {
  const canvas = createCanvas(480, 320);
  canvas.style('display: none;');
  setTimeout(() => {
    canvas.style(`display: block; width: ${width*CANVAS_SCALE}px; height: ${height*CANVAS_SCALE}px;`);
  }, 0);
  canvas.elt.addEventListener('contextmenu', (event: Event) => event.preventDefault());

  pixelDensity(1);

  AssetManager.loadFont('OCRAStd.otf', textFont);
  AssetManager.loadImage('starfield.png', img => { imgBackground = img; });
  AssetManager.loadSound('lazy-bones.mp3', sound => {
    music = sound;
    music.loop();
    music.setVolume(SaveDataHelper.getMusicVolume());


    window.addEventListener('blur', () => {
      music?.pause();
    });
  });

  ViewManager.transitionTo(new SplashView());
};

globalThis.draw = function (): void {
  background(0, 0);

  const gameView = ViewManager.views.find(view => view instanceof GameView) as GameView | undefined;
  if (imgBackground !== undefined) {
    if (gameView === undefined || !gameView.isPaused) {
      backgroundOffset = (backgroundOffset - 25 * (deltaTime/1000)) % imgBackground.width;
    }
    image(imgBackground, backgroundOffset, 0, width, height);
    image(imgBackground, backgroundOffset + imgBackground.width, 0, width, height);
  }

  if (music?.isPlaying() === true && ((gameView?.isPaused === true) || !document.hasFocus())) {
    music.pause();
  } else if (music?.isPlaying() === false && document.hasFocus() && (gameView === undefined || !gameView.isPaused)) {
    music.loop();
  }

  ViewManager.update();
  ViewManager.draw();
};

export function onVolumeChanged(): void {
  music?.setVolume(SaveDataHelper.getMusicVolume());
}
