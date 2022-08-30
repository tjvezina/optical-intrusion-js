export default class Button {
    constructor(imgBackground, x, y, width, height) {
        this.imgBackground = imgBackground;
        this.pos = createVector(x, y);
        this.size = createVector(width ?? imgBackground.width, height ?? imgBackground.height);
    }
    draw() {
        const { imgBackground, pos, size } = this;
        push();
        {
            imageMode(CENTER);
            image(imgBackground, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
    contains(x, y) {
        const { pos, size } = this;
        return (x > (pos.x - size.x / 2) && x < (pos.x + size.x / 2) &&
            y > (pos.y - size.y / 2) && y < (pos.y + size.y / 2));
    }
}
//# sourceMappingURL=button.js.map