import AssetManager from '../framework/asset-manager.js';
import Actor from './actor.js';
import { ColliderType } from './collision/collider.js';
import { WeaponType } from './player.js';

const BASIC_SPEED = 640;
const BASIC_DAMAGE = 1;
const MISSILE_SPEED = 320;
const MISSILE_DAMAGE = 5;

export default class Shot extends Actor {
  static imgBasic: p5.Image;
  static imgMissile: p5.Image;

  static async loadContent(): Promise<void> {
    await Promise.all([
      AssetManager.loadImage('shot-blue.png', img => { this.imgBasic = img; }),
      AssetManager.loadImage('shot-orange.png', img => { this.imgMissile = img; }),
    ]);
  }

  vel: p5.Vector;
  type: WeaponType;

  constructor(pos: p5.Vector, dir: p5.Vector, type: WeaponType) {
    super(type === WeaponType.Basic ? Shot.imgBasic : Shot.imgMissile, ColliderType.Circle);
    this.type = type;
    this.pos.set(pos);
    this.vel = dir.copy().setMag(type === WeaponType.Basic ? BASIC_SPEED : MISSILE_SPEED);
  }

  get damage(): number { return this.type === WeaponType.Basic ? BASIC_DAMAGE : MISSILE_DAMAGE; }

  override update(): void {
    // TODO: Remove explicit type casts when p5 type definitions are corrected
    this.pos.add(p5.Vector.mult(this.vel, deltaTime/1000) as unknown as p5.Vector);
  }

  override draw(): void {
    fill(this.type === WeaponType.Basic ? '#0f91db' : '#db810f').stroke(0).strokeWeight(1);
    circle(this.pos.x, this.pos.y, this.type === WeaponType.Basic ? 6 : 8);
  }
}
