import { loadImageAsync } from '../framework/asset-loading.js';
import Actor from './actor.js';
import { ColliderType } from './collision/collider.js';
export var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["A"] = 0] = "A";
    EnemyType[EnemyType["B"] = 1] = "B";
    EnemyType[EnemyType["C"] = 2] = "C";
    EnemyType[EnemyType["D"] = 3] = "D";
    EnemyType[EnemyType["E"] = 4] = "E";
})(EnemyType || (EnemyType = {}));
const HEALTH_BAR_HEIGHT = 6;
const MAX_VELOCITY = -24;
const MIN_VELOCITY = -96;
const ENEMY_DATA_MAP = {
    [EnemyType.A]: { scale: 0.4, health: 3, healthBarWidth: 32, healthBarOffset: 8 },
    [EnemyType.B]: { scale: 0.3, health: 2, healthBarWidth: 32, healthBarOffset: 8 },
    [EnemyType.C]: { scale: 0.2, health: 1, healthBarWidth: 32, healthBarOffset: 4 },
    [EnemyType.D]: { scale: 0.5, health: 5, healthBarWidth: 32, healthBarOffset: 8 },
    [EnemyType.E]: { scale: 2.0, health: 30, healthBarWidth: 64, healthBarOffset: 16 },
};
export default class Enemy extends Actor {
    constructor(type, wavePower) {
        super(Enemy.imgList[type], ColliderType.Circle);
        this.type = type;
        const data = ENEMY_DATA_MAP[type];
        this.size.mult(data.scale);
        this.maxHealth = this.health = data.health * wavePower;
        this.value = data.health * wavePower;
        this.pos.set(width + this.size.x / 2, random(height - this.size.y) + this.size.y / 2);
        this.vel = createVector(-48, 0);
        switch (this.type) {
            case EnemyType.B: {
                this.isFlipped = Enemy.nextEnemyBShouldFlip;
                Enemy.nextEnemyBShouldFlip = !Enemy.nextEnemyBShouldFlip;
                break;
            }
            case EnemyType.C: {
                this.vel.y = (random() < 0.5 ? -1 : 1) * 96;
                break;
            }
            case EnemyType.E: {
                this.pos.y = height / 2;
                this.vel.x = -16;
                this.maxHealth = this.health = data.health + 10 * wavePower;
                break;
            }
        }
    }
    static async loadContent() {
        await Promise.all([
            loadImageAsync('eye-blue.png', img => { this.imgList[0] = img; }),
            loadImageAsync('eye-green.png', img => { this.imgList[1] = img; }),
            loadImageAsync('eye-brown.png', img => { this.imgList[2] = img; }),
            loadImageAsync('eye-yellow.png', img => { this.imgList[3] = img; }),
            loadImageAsync('eye-red.png', img => { this.imgList[4] = img; }),
        ]);
    }
    update() {
        switch (this.type) {
            case EnemyType.A: {
                this.pos.x += this.vel.x * (deltaTime / 1000);
                break;
            }
            case EnemyType.B: {
                this.pos.x += this.vel.x * (deltaTime / 1000);
                this.pos.y = ((this.isFlipped ? 1 : -1) * cos(this.pos.x / (width / (5 * PI / 2))) + 1) *
                    ((height - this.size.y) / 2) + this.size.y / 2;
                break;
            }
            case EnemyType.C: {
                this.pos.add(p5.Vector.mult(this.vel, deltaTime / 1000));
                if (this.pos.y < this.size.y / 2) {
                    this.pos.y = this.size.y / 2;
                    this.vel.y *= -1;
                }
                else if (this.pos.y > height - this.size.y / 2) {
                    this.pos.y = height - this.size.y / 2;
                    this.vel.y *= -1;
                }
                break;
            }
            case EnemyType.D: {
                this.vel.x = ((cos(this.pos.x / (width / (12 * PI)))) * ((MAX_VELOCITY - MIN_VELOCITY) / 2)) +
                    ((MAX_VELOCITY + MIN_VELOCITY) / 2);
                this.pos.x += this.vel.x * (deltaTime / 1000);
                break;
            }
            case EnemyType.E: {
                this.pos.x += this.vel.x * (deltaTime / 1000);
                break;
            }
        }
    }
    draw() {
        super.draw();
        const { healthBarWidth: barWidth, healthBarOffset: offset } = ENEMY_DATA_MAP[this.type];
        const barX = this.pos.x;
        const barY = round(this.pos.y + this.size.y / 2 + offset + 3);
        push();
        {
            rectMode(CENTER);
            noFill().stroke(255).strokeWeight(1);
            rect(barX, barY, barWidth - 1, HEALTH_BAR_HEIGHT - 1);
            fill(255).noStroke();
            rect(barX, barY, max(1, (barWidth - 2) * (this.health / this.maxHealth)), HEALTH_BAR_HEIGHT - 2);
        }
        pop();
    }
    decreaseHealth(damage) {
        this.health = max(0, this.health - damage);
        return (this.health > 0);
    }
}
Enemy.imgList = [];
Enemy.nextEnemyBShouldFlip = false;
//# sourceMappingURL=enemy.js.map