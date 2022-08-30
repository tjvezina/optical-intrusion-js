import { loadImageAsync } from '../framework/asset-loading.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import Button from '../ui/button.js';
import CreditsView from './credits-view.js';
import GameView from './game-view.js';
import InstructionsView from './instructions-view.js';
import OptionsView from './options-view.js';

export default class MainMenuView extends View {
  imgBackground: p5.Image;
  imgTitle: p5.Image;

  playButton: Button;
  howToButton: Button;
  optionsButton: Button;
  creditsButton: Button;

  async loadContent(): Promise<void> {
    await Promise.all([
      loadImageAsync('starfield.png', img => { this.imgBackground = img; }),
      loadImageAsync('title.png', img => { this.imgTitle = img; }),

      loadImageAsync('button-play.png', img => {
        this.playButton = new Button(img, width/2 - 124, height/2 + 57);
      }),
      loadImageAsync('button-how-to.png', img => {
        this.howToButton = new Button(img, width/2 + 124, height/2 + 57);
      }),
      loadImageAsync('button-options.png', img => {
        this.optionsButton = new Button(img, width/2 - 124, height/2 + 122);
      }),
      loadImageAsync('button-credits.png', img => {
        this.creditsButton = new Button(img, width/2 + 124, height/2 + 122);
      }),
    ]);
  }

  mouseClicked(): void {
    if (this.playButton.contains(mouseX, mouseY)) {
      ViewManager.transitionTo(new GameView());
    }
    if (this.howToButton.contains(mouseX, mouseY)) {
      ViewManager.transitionTo(new InstructionsView());
    }
    if (this.optionsButton.contains(mouseX, mouseY)) {
      ViewManager.transitionTo(new OptionsView());
    }
    if (this.creditsButton.contains(mouseX, mouseY)) {
      ViewManager.transitionTo(new CreditsView());
    }
  }

  draw(): void {
    image(this.imgBackground, 0, 0, width, height);

    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 15);

    this.playButton.draw();
    this.howToButton.draw();
    this.optionsButton.draw();
    this.creditsButton.draw();
  }
}
