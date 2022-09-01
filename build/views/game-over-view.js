import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';
export default class GameOverView extends View {
    init() {
        this.imgBackground = AssetManager.getImage('starfield.png');
        this.imgContent = AssetManager.getImage('game-over.png');
    }
    mouseClicked() {
        ViewManager.transitionTo(new MainMenuView());
    }
    draw() {
        image(this.imgBackground, 0, 0, width, height);
        image(this.imgContent, 0, 0, width, height);
    }
}
//# sourceMappingURL=game-over-view.js.map