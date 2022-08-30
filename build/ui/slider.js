import InputManager from '../framework/input-manager.js';
const BAR_WIDTH = 194;
const BAR_THICK = 4;
const KNOB_DIAM = 27;
export default class Slider {
    constructor(x, y, onChange) {
        this.value = 0;
        this.knobPos = createVector(0, 0);
        this.isDragging = false;
        this.dragOffset = 0;
        this.pos = createVector(x, y);
        this.onChange = onChange;
        InputManager.addListener(this);
    }
    get knobMinX() { return this.pos.x - BAR_WIDTH / 2 + KNOB_DIAM / 2; }
    get knobMaxX() { return this.pos.x + BAR_WIDTH / 2 - KNOB_DIAM / 2; }
    dispose() {
        InputManager.removeListener(this);
    }
    mousePressed() {
        if (p5.Vector.dist(this.knobPos, createVector(mouseX, mouseY)) < KNOB_DIAM / 2) {
            this.isDragging = true;
            this.dragOffset = this.knobPos.x - mouseX;
        }
        else {
            const { pos, knobMinX, knobMaxX } = this;
            const distY = abs(mouseY - pos.y);
            if (distY < KNOB_DIAM / 2 && mouseX > pos.x - BAR_WIDTH / 2 && mouseX < pos.x + BAR_WIDTH / 2) {
                this.isDragging = true;
                this.dragOffset = 0;
                this.value = (mouseX - knobMinX) / (knobMaxX - knobMinX);
            }
        }
    }
    mouseDragged() {
        if (!this.isDragging)
            return;
        const { knobMinX, knobMaxX } = this;
        this.knobPos.x = constrain(mouseX + this.dragOffset, knobMinX, knobMaxX);
        this.value = (this.knobPos.x - knobMinX) / (knobMaxX - knobMinX);
        this.onChange();
    }
    mouseReleased() {
        this.isDragging = false;
    }
    update() {
        this.knobPos.set(lerp(this.knobMinX, this.knobMaxX, this.value), this.pos.y);
    }
    draw() {
        const { pos, knobPos } = this;
        const lineLength = BAR_WIDTH - BAR_THICK;
        strokeCap(ROUND);
        stroke('#7F7F7F50').strokeWeight(BAR_THICK).noFill();
        line(pos.x - lineLength / 2, pos.y, pos.x + lineLength / 2, pos.y);
        stroke('#007dfc');
        line(pos.x - lineLength / 2, pos.y, knobPos.x, pos.y);
        fill(255).noStroke();
        circle(knobPos.x, knobPos.y, KNOB_DIAM);
    }
}
//# sourceMappingURL=slider.js.map