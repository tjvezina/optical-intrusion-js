import { loadImageAsync } from '../framework/asset-loading.js';

const BG_SCROLL_SPEED = 25;

export default class Background {
  static img: p5.Image;

  static async loadContent(): Promise<void> {
    this.img = await loadImageAsync('starfield.png');
  }

  offset = 0;

  update(): void {
    this.offset = (this.offset - BG_SCROLL_SPEED * (deltaTime/1000)) % Background.img.width;
  }

  draw(): void {
    const { img } = Background;
    const { offset } = this;

    image(img, offset, 0, width, height);
    image(img, offset + img.width, 0, width, height);
  }
}
