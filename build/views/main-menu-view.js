import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import Button from '../ui/button.js';
import CreditsView from './credits-view.js';
import GameView from './game-view.js';
import InstructionsView from './instructions-view.js';
import OptionsView from './options-view.js';
export default class MainMenuView extends View {
    init() {
        this.imgBackground = AssetManager.getImage('starfield.png');
        this.imgTitle = AssetManager.getImage('title.png');
        const imgPlayButton = AssetManager.getImage('button-play.png');
        this.playButton = new Button(imgPlayButton, width / 2 - 124, height / 2 + 57);
        const imgHowToButton = AssetManager.getImage('button-how-to.png');
        this.howToButton = new Button(imgHowToButton, width / 2 + 124, height / 2 + 57);
        const imgOptionsButton = AssetManager.getImage('button-options.png');
        this.optionsButton = new Button(imgOptionsButton, width / 2 - 124, height / 2 + 122);
        const imgCreditsButton = AssetManager.getImage('button-credits.png');
        this.creditsButton = new Button(imgCreditsButton, width / 2 + 124, height / 2 + 122);
    }
    mouseClicked() {
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
    draw() {
        image(this.imgBackground, 0, 0, width, height);
        imageMode(CENTER);
        image(this.imgTitle, width / 2, height / 2 - 15);
        this.playButton.draw();
        this.howToButton.draw();
        this.optionsButton.draw();
        this.creditsButton.draw();
    }
}
//# sourceMappingURL=main-menu-view.js.map