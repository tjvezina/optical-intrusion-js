import AssetManager from '../framework/asset-manager.js';
import Actor from './actor.js';
export var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["Basic"] = 0] = "Basic";
    WeaponType[WeaponType["Missile"] = 1] = "Missile";
})(WeaponType || (WeaponType = {}));
const MAX_HEALTH = 100;
export default class Player extends Actor {
    constructor() {
        super(Player.img);
        this.health = MAX_HEALTH;
        this.angle = 0;
        this.pos.set(32, height / 2);
    }
    static async loadContent() {
        this.img = await AssetManager.loadImage('cannon.png');
    }
    draw() {
        push();
        {
            translate(this.pos.x, this.pos.y);
            rotate(PI / 2 + this.angle);
            imageMode(CENTER);
            image(this.img, 0, 0, this.size.x, this.size.y);
        }
        pop();
        const col = color('#79c861');
        noFill().stroke(col).strokeWeight(2);
        rect(7, 7, 8, height - 14);
        fill(lerpColor(color('#c50000'), col, this.health / MAX_HEALTH)).noStroke();
        rectMode(CENTER);
        rect(11, height / 2, 4, ceil((height - 18) * (this.health / MAX_HEALTH) / 2) * 2);
    }
    decreaseHealth(damage) {
        this.health = max(0, this.health - damage);
    }
    increaseHealth(health) {
        this.health = min(MAX_HEALTH, this.health + health);
    }
}
//# sourceMappingURL=player.js.map