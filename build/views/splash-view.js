import AssetManager from '../framework/asset-manager.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';
export default class SplashView extends View {
    async loadAssets() {
        await Promise.all([
            AssetManager.preloadImage('starfield.png'),
            AssetManager.preloadImage('title.png'),
            AssetManager.preloadImage('tap-to-continue.png'),
            AssetManager.preloadImage('button-play.png'),
            AssetManager.preloadImage('button-how-to.png'),
            AssetManager.preloadImage('button-options.png'),
            AssetManager.preloadImage('button-credits.png'),
            AssetManager.preloadImage('title-options.png'),
            AssetManager.preloadImage('title-credits.png'),
            AssetManager.preloadImage('button-back.png'),
            AssetManager.preloadImage('instructions-1.png'),
            AssetManager.preloadImage('instructions-2.png'),
            AssetManager.preloadImage('game-over.png'),
        ]);
    }
    init() {
        this.imgBackground = AssetManager.getImage('starfield.png');
        this.imgTitle = AssetManager.getImage('title.png');
        this.imgContinue = AssetManager.getImage('tap-to-continue.png');
    }
    mouseClicked() {
        ViewManager.transitionTo(new MainMenuView());
    }
    draw() {
        image(this.imgBackground, 0, 0, width, height);
        imageMode(CENTER);
        image(this.imgTitle, width / 2, height / 2 - 15);
        image(this.imgContinue, width / 2, height / 2 + 84);
    }
}
//# sourceMappingURL=splash-view.js.map