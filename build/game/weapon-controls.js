import AssetManager from '../framework/asset-manager.js';
import { WeaponType } from './player.js';
const MISSILE_RELOAD_TIME = 1;
export default class WeaponControls {
    constructor() {
        this.activeWeaponType = WeaponType.Basic;
        this.posBasic = createVector(32, height * 1 / 4 - WeaponControls.imgBasic.height / 2);
        this.posMissile = createVector(32, height * 3 / 4 - WeaponControls.imgMissile.height / 2);
        this.reloadTimer = 0;
    }
    static async loadContent() {
        await Promise.all([
            AssetManager.loadImage('weapon-box-blue.png', img => { this.imgBasic = img; }),
            AssetManager.loadImage('weapon-box-orange.png', img => { this.imgMissile = img; }),
            AssetManager.loadImage('weapon-box-glow.png', img => { this.imgHighlight = img; }),
        ]);
    }
    update() {
        this.reloadTimer = max(0, this.reloadTimer - (deltaTime / 1000));
    }
    draw() {
        const { imgBasic, imgMissile, imgHighlight } = WeaponControls;
        const { posBasic, posMissile, activeWeaponType: activeWeapon, reloadTimer } = this;
        image(imgBasic, posBasic.x, posBasic.y);
        image(imgMissile, posMissile.x, posMissile.y);
        if (activeWeapon === WeaponType.Basic) {
            image(imgHighlight, posBasic.x, posBasic.y);
        }
        else {
            image(imgHighlight, posMissile.x, posMissile.y, imgHighlight.width * (1 - (reloadTimer / MISSILE_RELOAD_TIME)));
        }
    }
    tryFire() {
        if (this.reloadTimer > 0) {
            return false;
        }
        if (this.activeWeaponType === WeaponType.Missile) {
            this.reloadTimer = MISSILE_RELOAD_TIME;
        }
        return true;
    }
    handleMousePressed() {
        const { imgBasic, imgMissile } = WeaponControls;
        const { posBasic, posMissile } = this;
        if (mouseX >= posBasic.x && mouseX < posBasic.x + imgBasic.width &&
            mouseY >= posBasic.y && mouseY < posBasic.y + imgBasic.height) {
            this.activeWeaponType = WeaponType.Basic;
            this.reloadTimer = 0;
            return true;
        }
        if (mouseX >= posMissile.x && mouseX < posMissile.x + imgMissile.width &&
            mouseY >= posMissile.y && mouseY < posMissile.y + imgMissile.height) {
            this.activeWeaponType = WeaponType.Missile;
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=weapon-controls.js.map