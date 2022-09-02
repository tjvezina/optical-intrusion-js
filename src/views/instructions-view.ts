import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';

export default class InstructionsView extends View {
  constructor() {
    super();
    this.doEnterFade = false;
    this.doExitFade = false;
  }

  mouseClicked(): void {
    ViewManager.transitionTo(new MainMenuView());
  }

  override draw(): void {
    fill('#c50000').stroke(0).strokeWeight(4);
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Shoot the enemy eyeballs before they get past you.\n\nLeft click to shoot, right click to fire missiles.\n\nSurvive as long as you can!',
      0, 0, width, height,
    );
  }
}
