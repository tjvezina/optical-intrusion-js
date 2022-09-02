import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

export default class SplashView extends View {
  imgTitle: p5.Image;
  imgContinue: p5.Image;

  constructor() {
    super();
    this.doExitFade = false;
  }

  override async loadAssets(): Promise<void> {
    // Preload assets for the menu system
    await Promise.all([
      AssetManager.preloadImage('starfield.png'),
      AssetManager.preloadImage('title.png'),
      AssetManager.preloadImage('tap-to-continue.png'),

      AssetManager.preloadImage('button-play.png'),
      AssetManager.preloadImage('button-how-to.png'),
      AssetManager.preloadImage('button-options.png'),
      AssetManager.preloadImage('button-credits.png'),

      AssetManager.preloadImage('title-options.png'),

      AssetManager.preloadImage('title-credits.png'),
      AssetManager.preloadImage('button-back.png'),

      AssetManager.preloadImage('game-over.png'),
    ]);
  }

  override init(): void {
    this.imgTitle = AssetManager.getImage('title.png');
    this.imgContinue = AssetManager.getImage('tap-to-continue.png');
  }

  mouseClicked(): void {
    ViewManager.transitionTo(new MainMenuView());
  }

  override draw(): void {
    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 15);
    tint(255, 255 * this.transitionPos);
    image(this.imgContinue, width/2, height/2 + 84);
  }
}
