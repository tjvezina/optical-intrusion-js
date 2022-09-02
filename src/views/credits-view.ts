import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import Button from '../ui/button.js';
import MainMenuView from './main-menu-view.js';

export default class CreditsView extends View {
  imgTitle: p5.Image;

  backButton: Button;

  constructor() {
    super();
    this.doEnterFade = false;
    this.doExitFade = false;
  }

  override init(): void {
    this.imgTitle = AssetManager.getImage('title-credits.png');

    const imgBackButton = AssetManager.getImage('button-back.png');
    this.backButton = new Button(imgBackButton, 79, height - 32);
  }

  mouseClicked(): void {
    if (this.backButton.contains(mouseX, mouseY)) {
      ViewManager.transitionTo(new MainMenuView());
    }
  }

  override draw(): void {
    tint(255, 255 * this.transitionPos);

    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 108);

    fill('#a88f59').stroke(0).strokeWeight(4);
    textSize(24);
    textStyle(BOLD);
    textAlign(RIGHT);
    text('Created By:', width/2 - 24, 133);
    text('Music:', width/2 - 24, 195);

    textStyle(ITALIC);
    textAlign(LEFT);
    text('Tyler Vezina', width/2, 133);
    text('"Lazy Bones"\nFreePlayMusic', width/2, 195);

    this.backButton.draw();
  }
}
