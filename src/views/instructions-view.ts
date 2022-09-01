import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

const PAGE_COUNT = 2;

export default class InstructionsView extends View {
  imgPage1: p5.Image;
  imgPage2: p5.Image;

  currentPage = 0;

  override init(): void {
    this.imgPage1 = AssetManager.getImage('instructions-1.png');
    this.imgPage2 = AssetManager.getImage('instructions-2.png');
  }

  mouseClicked(): void {
    if (this.currentPage < PAGE_COUNT - 1) {
      ++this.currentPage;
    } else {
      ViewManager.transitionTo(new MainMenuView());
    }
  }

  override draw(): void {
    image([this.imgPage1, this.imgPage2][this.currentPage], 0, 0, width, height);
  }
}
