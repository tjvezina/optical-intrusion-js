import { loadImageAsync } from '../framework/asset-loading.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

export default class GameOverView extends View {
  imgBackground: p5.Image;
  imgContent: p5.Image;

  async loadContent(): Promise<void> {
    await Promise.all([
      loadImageAsync('starfield.png', img => { this.imgBackground = img; }),
      loadImageAsync('game-over.png', img => { this.imgContent = img; }),
    ]);
  }

  mouseClicked(): void {
    ViewManager.transitionTo(new MainMenuView());
  }

  draw(): void {
    image(this.imgBackground, 0, 0, width, height);
    image(this.imgContent, 0, 0, width, height);
  }
}
