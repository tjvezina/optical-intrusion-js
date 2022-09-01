import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import SaveDataHelper from '../io/save-data-helper.js';
import Button from '../ui/button.js';
import Slider from '../ui/slider.js';
import MainMenuView from './main-menu-view.js';

export default class OptionsView extends View {
  imgBackground: p5.Image;
  imgTitle: p5.Image;

  backButton: Button;

  musicVolumeSlider = new Slider(346, 128, this.onMusicVolumeChanged.bind(this));
  sfxVolumeSlider = new Slider(346, 195, this.onSFXVolumeChanged.bind(this));

  constructor() {
    super();
    this.musicVolumeSlider.value = SaveDataHelper.getMusicVolume();
    this.sfxVolumeSlider.value = SaveDataHelper.getSFXVolume();
  }

  override onDispose(): void {
    this.musicVolumeSlider.dispose();
    this.sfxVolumeSlider.dispose();
  }

  override init(): void {
    this.imgBackground = AssetManager.getImage('starfield.png');
    this.imgTitle = AssetManager.getImage('title-options.png');

    const imgBackButton = AssetManager.getImage('button-back.png');
    this.backButton = new Button(imgBackButton, 79, height - 32);
  }

  mouseClicked(): void {
    if (this.backButton.contains(mouseX, mouseY)) {
      ViewManager.transitionTo(new MainMenuView());
    }
  }

  override update(): void {
    this.musicVolumeSlider.update();
    this.sfxVolumeSlider.update();
  }

  override draw(): void {
    image(this.imgBackground, 0, 0, width, height);

    imageMode(CENTER);
    image(this.imgTitle, width/2, height/2 - 108);

    textFont('sans-serif');
    fill('#a88f59').noStroke();
    textSize(24);
    textStyle(BOLD);
    textAlign(RIGHT, CENTER);
    text('Music Volume', width/2 - 12, 128);
    text('SFX Volume', width/2 - 12, 195);

    this.musicVolumeSlider.draw();
    this.sfxVolumeSlider.draw();

    this.backButton.draw();
  }

  onMusicVolumeChanged(): void {
    SaveDataHelper.setMusicVolume(this.musicVolumeSlider.value);
  }

  onSFXVolumeChanged(): void {
    SaveDataHelper.setSFXVolume(this.sfxVolumeSlider.value);
  }
}
