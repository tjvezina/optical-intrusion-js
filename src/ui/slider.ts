import InputManager from '../framework/input-manager.js';

const BAR_WIDTH = 194;
const BAR_THICK = 4;
const KNOB_DIAM = 27;

export default class Slider {
  pos: p5.Vector;

  onChange: () => void;

  value = 0;
  knobPos = createVector(0, 0);

  isDragging = false;
  dragOffset = 0;

  get knobMinX(): number { return this.pos.x - BAR_WIDTH/2 + KNOB_DIAM/2; }
  get knobMaxX(): number { return this.pos.x + BAR_WIDTH/2 - KNOB_DIAM/2; }

  constructor(x: number, y: number, onChange: () => void) {
    this.pos = createVector(x, y);
    this.onChange = onChange;

    InputManager.addListener(this);
  }

  dispose(): void {
    InputManager.removeListener(this);
  }

  mousePressed(): void {
    if (p5.Vector.dist(this.knobPos, createVector(mouseX, mouseY)) < KNOB_DIAM/2) {
      this.isDragging = true;
      this.dragOffset = this.knobPos.x - mouseX;
    } else {
      const { pos, knobMinX, knobMaxX } = this;
      const distY = abs(mouseY - pos.y);
      if (distY < KNOB_DIAM/2 && mouseX > pos.x - BAR_WIDTH/2 && mouseX < pos.x + BAR_WIDTH/2) {
        this.isDragging = true;
        this.dragOffset = 0;
        this.value = (mouseX - knobMinX) / (knobMaxX - knobMinX);
      }
    }
  }

  mouseDragged(): void {
    if (!this.isDragging) return;

    const { knobMinX, knobMaxX } = this;
    this.knobPos.x = constrain(mouseX + this.dragOffset, knobMinX, knobMaxX);
    this.value = (this.knobPos.x - knobMinX) / (knobMaxX - knobMinX);

    this.onChange();
  }

  mouseReleased(): void {
    this.isDragging = false;
  }

  update(): void {
    this.knobPos.set(lerp(this.knobMinX, this.knobMaxX, this.value), this.pos.y);
  }

  draw(): void {
    const { pos, knobPos } = this;

    const lineLength = BAR_WIDTH - BAR_THICK;

    strokeCap(ROUND);
    stroke('#7F7F7F50').strokeWeight(BAR_THICK).noFill();
    line(pos.x - lineLength/2, pos.y, pos.x + lineLength/2, pos.y);
    stroke('#007dfc');
    line(pos.x - lineLength/2, pos.y, knobPos.x, pos.y);

    fill(255).noStroke();
    circle(knobPos.x, knobPos.y, KNOB_DIAM);
  }
}
