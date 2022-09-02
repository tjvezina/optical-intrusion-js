import AssetManager from '../framework/asset-manager.js';
import Actor from './actor.js';

export enum WeaponType {
  Basic,
  Missile,
}

const MAX_HEALTH = 100;

export default class Player extends Actor {
  static img: p5.Image;

  static async loadContent(): Promise<void> {
    this.img = await AssetManager.loadImage('cannon.png');
  }

  health = MAX_HEALTH;

  angle = 0;

  constructor() {
    super(Player.img);
    this.pos.set(32, height/2);
  }

  override draw(): void {
    push();
    {
      translate(this.pos.x, this.pos.y);
      rotate(PI/2 + this.angle);
      imageMode(CENTER);
      image(this.img, 0, 0, this.size.x, this.size.y);
    }
    pop();

    const col = color('#79c861');
    noFill().stroke(col).strokeWeight(2);
    rect(7, 7, 8, height - 14);

    fill(lerpColor(color('#c50000'), col, this.health / MAX_HEALTH)).noStroke();
    rectMode(CENTER);
    rect(11, height/2, 4, ceil((height - 18) * (this.health / MAX_HEALTH) / 2) * 2);
  }

  decreaseHealth(damage: number): void {
    this.health = max(0, this.health - damage);
  }

  increaseHealth(health: number): void {
    this.health = min(MAX_HEALTH, this.health + health);
  }
}
