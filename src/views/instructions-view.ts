import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

const PAGE_COUNT = 2;

export default class InstructionsView extends View {
  imgPage1: p5.Image;
  imgPage2: p5.Image;

  currentPage = 0;

  override async loadAssets(): Promise<void> {
    await Promise.all([
      AssetManager.loadImage('instructions-1.png', img => { this.imgPage1 = img; }),
      AssetManager.loadImage('instructions-2.png', img => { this.imgPage2 = img; }),
    ]);
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
