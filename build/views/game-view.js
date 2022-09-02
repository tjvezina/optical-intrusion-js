import AssetManager from '../framework/asset-manager.js';
import View, { ViewState } from '../framework/view-manager/view.js';
import ViewManager from '../framework/view-manager/view-manager.js';
import CollisionManager from '../game/collision/collision-manager.js';
import Enemy, { EnemyType } from '../game/enemy.js';
import Explosion from '../game/explosion.js';
import Player, { WeaponType } from '../game/player.js';
import Shot from '../game/shot.js';
import Wave, { WaveState } from '../game/wave.js';
import WeaponControls from '../game/weapon-controls.js';
import SaveDataHelper from '../io/save-data-helper.js';
import GameOverView from './game-over-view.js';
export default class GameView extends View {
    constructor() {
        super();
        this.loadingPercentage = 0;
        this.enemyList = [];
        this.shotList = [];
        this.explosionList = [];
        this.currentScore = 0;
        this.highScore = SaveDataHelper.getHighScore();
        this.aimingWeaponType = null;
        this.isPaused = false;
        this.isGameOver = false;
        this.lastFocusTime = 0;
        this.doEnterFade = false;
        this.doExitFade = false;
    }
    onDispose() {
        this.collisionManager.dispose();
    }
    async loadAssets() {
        const loadSteps = [
            AssetManager.loadSound('shot.wav', sound => { this.shotSound = sound; }),
            AssetManager.loadSound('missile.wav', sound => { this.missileSound = sound; }),
            AssetManager.loadSound('damage.wav', sound => { this.damageSound = sound; }),
            AssetManager.loadSound('explode.wav', sound => { this.explodeSound = sound; }),
            AssetManager.loadSound('enemy-damage.wav', sound => { this.enemyDamageSound = sound; }),
            Player.loadContent(),
            Shot.loadContent(),
            Enemy.loadContent(),
            Explosion.loadContent(),
        ];
        let stepsCompletedCount = 0;
        await Promise.all(loadSteps.map(step => Promise.resolve(step).then(() => {
            this.loadingPercentage = (++stepsCompletedCount / loadSteps.length);
        })));
    }
    init() {
        this.weaponControls = new WeaponControls();
        this.player = new Player();
        this.collisionManager = new CollisionManager(this);
        this.wave = new Wave(enemyType => this.enemyList.push(new Enemy(enemyType, this.wave.power)));
    }
    drawLoadingIndicator() {
        const spacer = 2;
        const barWidth = width * 0.8;
        const barHeight = height * 0.04;
        const barX = (width - barWidth) / 2;
        const barY = (height - barHeight) / 2;
        noStroke();
        fill(255);
        rect(barX, barY, barWidth, barHeight);
        fill(0);
        rect(barX + spacer, barY + spacer, barWidth - spacer * 2, barHeight - spacer * 2);
        fill(255);
        rect(barX + spacer * 2, barY + spacer * 2, (barWidth - spacer * 4) * this.loadingPercentage, barHeight - spacer * 4);
    }
    onBlur() {
        this.pause();
    }
    pause() {
        if (!this.isPaused) {
            this.isPaused = true;
        }
    }
    unpause() {
        if (this.isPaused) {
            this.isPaused = false;
        }
    }
    update() {
        if (this.isPaused)
            return;
        this.collisionManager.update();
        this.wave.update();
        if (this.wave.state === WaveState.Waiting && this.enemyList.length === 0) {
            this.wave.startNextWave();
        }
        this.enemyList = this.enemyList.filter(enemy => {
            enemy.update();
            if (enemy.pos.x <= -enemy.size.x / 2) {
                this.collisionManager.removeCollider(enemy.collider);
                this.player.decreaseHealth(enemy.value);
                this.playSound(this.damageSound);
                if (enemy.type === EnemyType.E) {
                    this.isGameOver = true;
                }
                return false;
            }
            return true;
        });
        this.shotList = this.shotList.filter(shot => {
            shot.update();
            if (shot.pos.x < 0 || shot.pos.x >= width || shot.pos.y < 0 || shot.pos.y >= height) {
                this.collisionManager.removeCollider(shot.collider);
                this.currentScore = max(0, this.currentScore - 1);
                return false;
            }
            return true;
        });
        this.explosionList = this.explosionList.filter(explosion => explosion.update());
        this.weaponControls.update();
        if (this.player.health === 0) {
            this.isGameOver = true;
        }
        if (this.isGameOver && this.state === ViewState.Active) {
            ViewManager.transitionTo(new GameOverView());
        }
    }
    draw() {
        this.weaponControls.draw();
        this.enemyList.forEach(enemy => enemy.draw());
        this.explosionList.forEach(explosion => explosion.draw());
        if (this.aimingWeaponType !== null) {
            const delta = p5.Vector.sub(createVector(mouseX, mouseY), this.player.pos);
            const angle = atan2(delta.y, max(0, delta.x));
            push();
            {
                translate(this.player.pos.x, this.player.pos.y);
                rotate(angle);
                noFill().strokeWeight(3);
                stroke(this.weaponControls.canFire(this.aimingWeaponType) ? '#c50000' : '#c5000040');
                line(0, 0, width + height, 0);
            }
            pop();
            this.player.angle = angle;
        }
        this.shotList.forEach(shot => shot.draw());
        this.player.draw();
        if (this.wave.state === WaveState.Resetting) {
            push();
            {
                textAlign(CENTER, CENTER);
                textSize(height / 10);
                fill('#93cd53').stroke(0).strokeWeight(4);
                text(`WAVE ${this.wave.power + 1}\nCOMPLETE`, width / 2, height / 2);
            }
            pop();
        }
        textSize(18);
        textAlign(LEFT, CENTER);
        fill('#fd801c').stroke(0).strokeWeight(4);
        text(`Your Score: ${this.currentScore}`, 28, 22);
        fill('#119ac4');
        text(`High Score: ${this.highScore}`, 28, height - 22);
        if (this.isPaused) {
            background(0, 127);
            textAlign(CENTER, CENTER);
            textSize(height / 10);
            fill('#93cd53').stroke(0).strokeWeight(4);
            text('PAUSED', width / 2, height / 2);
        }
    }
    keyPressed() {
        if (keyCode === ESCAPE) {
            if (this.isPaused) {
                this.unpause();
            }
            else {
                this.pause();
            }
        }
    }
    mouseClicked() {
        if (this.isPaused && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
            this.unpause();
        }
    }
    mousePressed() {
        if (this.isPaused)
            return;
        if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
            this.aimingWeaponType = (mouseButton === LEFT ? WeaponType.Basic : WeaponType.Missile);
        }
    }
    mouseReleased() {
        if (this.aimingWeaponType !== null && this.weaponControls.tryFire(this.aimingWeaponType)) {
            const delta = p5.Vector.sub(createVector(mouseX, mouseY), this.player.pos);
            delta.x = max(0, delta.x);
            this.shotList.push(new Shot(this.player.pos, delta, this.aimingWeaponType));
            this.playSound(this.shotSound);
        }
        this.aimingWeaponType = null;
    }
    onCollision(colliderA, colliderB) {
        const actorA = colliderA.actor;
        const actorB = colliderB.actor;
        if (actorA instanceof Shot || actorB instanceof Shot) {
            if (actorA instanceof Enemy || actorB instanceof Enemy) {
                const shot = (actorA instanceof Shot ? actorA : actorB);
                const enemy = (actorA instanceof Enemy ? actorA : actorB);
                if (enemy.decreaseHealth(shot.damage)) {
                    this.playSound(this.enemyDamageSound);
                }
                else {
                    this.explosionList.push(new Explosion(enemy));
                    this.currentScore += enemy.value;
                    SaveDataHelper.setHighScore(max(SaveDataHelper.getHighScore(), this.currentScore));
                    this.enemyList.splice(this.enemyList.indexOf(enemy), 1);
                    CollisionManager.instance?.removeCollider(enemy.collider);
                    this.playSound(this.explodeSound);
                }
                this.shotList.splice(this.shotList.indexOf(shot), 1);
                CollisionManager.instance?.removeCollider(shot.collider);
            }
        }
    }
    playSound(sound) {
        sound.play();
        sound.setVolume(SaveDataHelper.getSFXVolume());
    }
}
//# sourceMappingURL=game-view.js.map