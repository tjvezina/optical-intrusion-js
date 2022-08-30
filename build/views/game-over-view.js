import { loadImageAsync } from '../framework/asset-loading.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';
export default class GameOverView extends View {
    async loadContent() {
        await Promise.all([
            loadImageAsync('starfield.png', img => { this.imgBackground = img; }),
            loadImageAsync('game-over.png', img => { this.imgContent = img; }),
        ]);
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