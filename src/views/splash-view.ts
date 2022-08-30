import { loadImageAsync } from '../framework/asset-loading.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

export default class SplashView extends View {
  imgBackground: p5.Image;
  imgTitle: p5.Image;
  imgContinue: p5.Image;

  async loadContent(): Promise<void> {
    await Promise.all([
      loadImageAsync('starfield.png', img => { this.imgBackground = img; }),
      loadImageAsync('title.png', img => { this.imgTitle = img; }),
      loadImageAsync('tap-to-continue.png', img => { this.imgContinue = img; }),
    ]);
  }

  mouseClicked(): void {
    ViewManager.transitionTo(new MainMenuView());
  }

  draw(): void {
    image(this.imgBackground, 0, 0, width, height);

    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 15);
    image(this.imgContinue, width/2, height/2 + 84);
  }
}
