import { loadImageAsync } from '../framework/asset-loading.js';
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
            loadImageAsync('shot-blue.png', img => { this.imgBasic = img; }),
            loadImageAsync('shot-orange.png', img => { this.imgMissile = img; }),
        ]);
    }
    get damage() { return this.type === WeaponType.Basic ? BASIC_DAMAGE : MISSILE_DAMAGE; }
    update() {
        this.pos.add(p5.Vector.mult(this.vel, deltaTime / 1000));
    }
}
//# sourceMappingURL=shot.js.map