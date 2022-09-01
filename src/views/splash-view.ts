import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

export default class SplashView extends View {
  imgBackground: p5.Image;
  imgTitle: p5.Image;
  imgContinue: p5.Image;

  override async loadAssets(): Promise<void> {
    await Promise.all([
      AssetManager.loadImage('starfield.png', img => { this.imgBackground = img; }),
      AssetManager.loadImage('title.png', img => { this.imgTitle = img; }),
      AssetManager.loadImage('tap-to-continue.png', img => { this.imgContinue = img; }),
    ]);
  }

  mouseClicked(): void {
    ViewManager.transitionTo(new MainMenuView());
  }

  override draw(): void {
    image(this.imgBackground, 0, 0, width, height);

    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 15);
    image(this.imgContinue, width/2, height/2 + 84);
  }
}
