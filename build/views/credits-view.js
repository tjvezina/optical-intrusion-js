import { loadImageAsync } from '../framework/asset-loading.js';
import View from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import Button from '../ui/button.js';
import MainMenuView from './main-menu-view.js';
export default class CreditsView extends View {
    async loadContent() {
        await Promise.all([
            loadImageAsync('starfield.png', img => { this.imgBackground = img; }),
            loadImageAsync('title-credits.png', img => { this.imgTitle = img; }),
            loadImageAsync('button-back.png', img => {
                this.backButton = new Button(img, 79, height - 32);
            }),
        ]);
    }
    mouseClicked() {
        if (this.backButton.contains(mouseX, mouseY)) {
            ViewManager.transitionTo(new MainMenuView());
        }
    }
    draw() {
        image(this.imgBackground, 0, 0, width, height);
        imageMode(CENTER);
        image(this.imgTitle, width / 2, height / 2 - 108);
        fill('#a88f59').noStroke();
        textSize(24);
        textStyle(BOLD);
        textAlign(RIGHT);
        text('Created By:', width / 2 - 12, 133);
        text('Music:', width / 2 - 12, 195);
        textStyle(ITALIC);
        textAlign(LEFT);
        text('Tyler Vezina', width / 2 + 16, 133);
        text('"Lazy Bones"\nFreePlayMusic', width / 2 + 16, 195);
        this.backButton.draw();
    }
}
//# sourceMappingURL=credits-view.js.map