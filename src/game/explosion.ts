import AssetManager from '../framework/asset-manager.js';
import Sprite from '../framework/sprite.js';
import Enemy from './enemy.js';

export default class Explosion {
  static img: p5.Image;

  static async loadContent(): Promise<void> {
    this.img = await AssetManager.loadImage('explosion.png');
  }

  sprite: Sprite;

  pos: p5.Vector;
  scale: number;

  constructor(enemy: Enemy) {
    this.sprite = new Sprite(Explosion.img, 5, 5, 30, false);

    this.pos = enemy.pos.copy();

    this.scale = 1;
    if (enemy.size.x <= 25) this.scale = 0.5;
    if (enemy.size.x >= 128) this.scale = 4;
  }

  update(): boolean {
    this.sprite.update();

    return !this.sprite.isComplete;
  }

  draw(): void {
    const { sprite, pos, scale } = this;

    sprite.draw(pos.x, pos.y, sprite.frameWidth * scale, sprite.frameHeight * scale);
  }
}
