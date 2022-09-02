import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';
export default class GameOverView extends View {
    constructor() {
        super();
        this.doEnterFade = false;
        this.doExitFade = false;
    }
    init() {
        this.imgContent = AssetManager.getImage('game-over.png');
    }
    mouseClicked() {
        ViewManager.transitionTo(new MainMenuView());
    }
    draw() {
        tint(255, 255 * this.transitionPos);
        image(this.imgContent, 0, 0, width, height);
    }
}
//# sourceMappingURL=game-over-view.js.map