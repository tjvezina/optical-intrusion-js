import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

export default class GameOverView extends View {
  imgBackground: p5.Image;
  imgContent: p5.Image;

  override init(): void {
    this.imgBackground = AssetManager.getImage('starfield.png');
    this.imgContent = AssetManager.getImage('game-over.png');
  }

  mouseClicked(): void {
    ViewManager.transitionTo(new MainMenuView());
  }

  override draw(): void {
    image(this.imgBackground, 0, 0, width, height);
    image(this.imgContent, 0, 0, width, height);
  }
}
