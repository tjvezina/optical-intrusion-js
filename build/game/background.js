import AssetManager from '../framework/asset-manager.js';
const BG_SCROLL_SPEED = 25;
export default class Background {
    constructor() {
        this.offset = 0;
    }
    static async loadContent() {
        this.img = await AssetManager.loadImage('starfield.png');
    }
    update() {
        this.offset = (this.offset - BG_SCROLL_SPEED * (deltaTime / 1000)) % Background.img.width;
    }
    draw() {
        const { img } = Background;
        const { offset } = this;
        image(img, offset, 0, width, height);
        image(img, offset + img.width, 0, width, height);
    }
}
//# sourceMappingURL=background.js.map