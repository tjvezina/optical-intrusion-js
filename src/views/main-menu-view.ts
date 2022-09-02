import AssetManager from '../framework/asset-manager.js';
import View, { ViewState } from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import Button from '../ui/button.js';
import CreditsView from './credits-view.js';
import GameView from './game-view.js';
import InstructionsView from './instructions-view.js';
import OptionsView from './options-view.js';

let isFirstAppearance = true;

export default class MainMenuView extends View {
  imgTitle: p5.Image;

  playButton: Button;
  howToButton: Button;
  optionsButton: Button;
  creditsButton: Button;

  constructor() {
    super();
    this.doEnterFade = false;
    this.doExitFade = false;
  }

  override init(): void {
    this.imgTitle = AssetManager.getImage('title.png');

    const imgPlayButton = AssetManager.getImage('button-play.png');
    this.playButton = new Button(imgPlayButton, width/2 - 124, height/2 + 57);

    const imgHowToButton = AssetManager.getImage('button-how-to.png');
    this.howToButton = new Button(imgHowToButton, width/2 + 124, height/2 + 57);

    const imgOptionsButton = AssetManager.getImage('button-options.png');
    this.optionsButton = new Button(imgOptionsButton, width/2 - 124, height/2 + 122);

    const imgCreditsButton = AssetManager.getImage('button-credits.png');
    this.creditsButton = new Button(imgCreditsButton, width/2 + 124, height/2 + 122);
  }

  override onDispose(): void {
    isFirstAppearance = false;
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

  override draw(): void {
    if (!isFirstAppearance || this.state === ViewState.Exiting) {
      tint(255, 255 * this.transitionPos);
    }
    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 15);

    tint(255, 255 * this.transitionPos);
    this.playButton.draw();
    this.howToButton.draw();
    this.optionsButton.draw();
    this.creditsButton.draw();
  }
}
