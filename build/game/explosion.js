import { loadImageAsync } from '../framework/asset-loading.js';
import Sprite from '../framework/sprite.js';
export default class Explosion {
    constructor(enemy) {
        this.sprite = new Sprite(Explosion.img, 5, 5, 30, false);
        this.pos = enemy.pos.copy();
        this.scale = 1;
        if (enemy.size.x <= 25)
            this.scale = 0.5;
        if (enemy.size.x >= 128)
            this.scale = 4;
    }
    static async loadContent() {
        this.img = await loadImageAsync('explosion.png');
    }
    update() {
        this.sprite.update();
        return !this.sprite.isComplete;
    }
    draw() {
        const { sprite, pos, scale } = this;
        sprite.draw(pos.x, pos.y, sprite.frameWidth * scale, sprite.frameHeight * scale);
    }
}
//# sourceMappingURL=explosion.js.map