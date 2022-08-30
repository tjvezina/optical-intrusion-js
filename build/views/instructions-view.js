import { loadImageAsync } from '../framework/asset-loading.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import MainMenuView from './main-menu-view.js';
const PAGE_COUNT = 2;
export default class InstructionsView extends View {
    constructor() {
        super(...arguments);
        this.currentPage = 0;
    }
    async loadContent() {
        await Promise.all([
            loadImageAsync('instructions-1.png', img => { this.imgPage1 = img; }),
            loadImageAsync('instructions-2.png', img => { this.imgPage2 = img; }),
        ]);
    }
    mouseClicked() {
        if (this.currentPage < PAGE_COUNT - 1) {
            ++this.currentPage;
        }
        else {
            ViewManager.transitionTo(new MainMenuView());
        }
    }
    draw() {
        image([this.imgPage1, this.imgPage2][this.currentPage], 0, 0, width, height);
    }
}
//# sourceMappingURL=instructions-view.js.map