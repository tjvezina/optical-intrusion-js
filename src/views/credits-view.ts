import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import Button from '../ui/button.js';
import MainMenuView from './main-menu-view.js';

export default class CreditsView extends View {
  imgBackground: p5.Image;
  imgTitle: p5.Image;

  backButton: Button;

  override init(): void {
    this.imgBackground = AssetManager.getImage('starfield.png');
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
    image(this.imgBackground, 0, 0, width, height);

    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 108);

    fill('#a88f59').noStroke();
    textSize(24);
    textStyle(BOLD);
    textAlign(RIGHT);
    text('Created By:', width/2 - 12, 133);
    text('Music:', width/2 - 12, 195);

    textStyle(ITALIC);
    textAlign(LEFT);
    text('Tyler Vezina', width/2 + 16, 133);
    text('"Lazy Bones"\nFreePlayMusic', width/2 + 16, 195);

    this.backButton.draw();
  }
}
