export default class Button {
  imgBackground: p5.Image;
  pos: p5.Vector;
  size: p5.Vector;

  constructor(imgBackground: p5.Image, x: number, y: number, width?: number, height?: number) {
    this.imgBackground = imgBackground;
    this.pos = createVector(x, y);
    this.size = createVector(width ?? imgBackground.width, height ?? imgBackground.height);
  }

  draw(): void {
    const { imgBackground, pos, size } = this;

    push();
    {
      imageMode(CENTER);
      image(imgBackground, pos.x, pos.y, size.x, size.y);
    }
    pop();
  }

  contains(x: number, y: number): boolean {
    const { pos, size } = this;

    return (
      x > (pos.x - size.x/2) && x < (pos.x + size.x/2) &&
      y > (pos.y - size.y/2) && y < (pos.y + size.y/2)
    );
  }
}
