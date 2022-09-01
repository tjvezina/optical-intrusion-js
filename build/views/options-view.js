import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import SaveDataHelper from '../io/save-data-helper.js';
import Button from '../ui/button.js';
import Slider from '../ui/slider.js';
import MainMenuView from './main-menu-view.js';
export default class OptionsView extends View {
    constructor() {
        super();
        this.musicVolumeSlider = new Slider(346, 128, this.onMusicVolumeChanged.bind(this));
        this.sfxVolumeSlider = new Slider(346, 195, this.onSFXVolumeChanged.bind(this));
        this.musicVolumeSlider.value = SaveDataHelper.getMusicVolume();
        this.sfxVolumeSlider.value = SaveDataHelper.getSFXVolume();
    }
    onDispose() {
        this.musicVolumeSlider.dispose();
        this.sfxVolumeSlider.dispose();
    }
    async loadAssets() {
        await Promise.all([
            AssetManager.loadImage('starfield.png', img => { this.imgBackground = img; }),
            AssetManager.loadImage('title-options.png', img => { this.imgTitle = img; }),
            AssetManager.loadImage('button-back.png', img => {
                this.backButton = new Button(img, 79, height - 32);
            }),
        ]);
    }
    mouseClicked() {
        if (this.backButton.contains(mouseX, mouseY)) {
            ViewManager.transitionTo(new MainMenuView());
        }
    }
    update() {
        this.musicVolumeSlider.update();
        this.sfxVolumeSlider.update();
    }
    draw() {
        image(this.imgBackground, 0, 0, width, height);
        imageMode(CENTER);
        image(this.imgTitle, width / 2, height / 2 - 108);
        textFont('sans-serif');
        fill('#a88f59').noStroke();
        textSize(24);
        textStyle(BOLD);
        textAlign(RIGHT, CENTER);
        text('Music Volume', width / 2 - 12, 128);
        text('SFX Volume', width / 2 - 12, 195);
        this.musicVolumeSlider.draw();
        this.sfxVolumeSlider.draw();
        this.backButton.draw();
    }
    onMusicVolumeChanged() {
        SaveDataHelper.setMusicVolume(this.musicVolumeSlider.value);
    }
    onSFXVolumeChanged() {
        SaveDataHelper.setSFXVolume(this.sfxVolumeSlider.value);
    }
}
//# sourceMappingURL=options-view.js.map