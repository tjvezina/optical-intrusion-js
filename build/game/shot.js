import AssetManager from '../framework/asset-manager.js';
import Actor from './actor.js';
import { ColliderType } from './collision/collider.js';
import { WeaponType } from './player.js';
const BASIC_SPEED = 640;
const BASIC_DAMAGE = 1;
const MISSILE_SPEED = 320;
const MISSILE_DAMAGE = 5;
export default class Shot extends Actor {
    constructor(pos, dir, type) {
        super(type === WeaponType.Basic ? Shot.imgBasic : Shot.imgMissile, ColliderType.Circle);
        this.type = type;
        this.pos.set(pos);
        this.vel = dir.copy().setMag(type === WeaponType.Basic ? BASIC_SPEED : MISSILE_SPEED);
    }
    static async loadContent() {
        await Promise.all([
            AssetManager.loadImage('shot-blue.png', img => { this.imgBasic = img; }),
            AssetManager.loadImage('shot-orange.png', img => { this.imgMissile = img; }),
        ]);
    }
    get damage() { return this.type === WeaponType.Basic ? BASIC_DAMAGE : MISSILE_DAMAGE; }
    update() {
        this.pos.add(p5.Vector.mult(this.vel, deltaTime / 1000));
    }
    draw() {
        fill(this.type === WeaponType.Basic ? '#0f91db' : '#db810f').stroke(0).strokeWeight(1);
        circle(this.pos.x, this.pos.y, this.type === WeaponType.Basic ? 6 : 8);
    }
}
//# sourceMappingURL=shot.js.map