import { WeaponType } from './player.js';

const BASIC_RELOAD_TIME = 0.1;
const MISSILE_RELOAD_TIME = 1;

const BAR_HEIGHT = 64;
const BAR_WIDTH = 4;

export default class WeaponControls {
  basicReloadTimer = 0;
  missileReloadTimer = 0;

  update(): void {
    this.basicReloadTimer = max(0, this.basicReloadTimer - (deltaTime/1000));
    this.missileReloadTimer = max(0, this.missileReloadTimer - (deltaTime/1000));
  }

  draw(): void {
    const { basicReloadTimer, missileReloadTimer } = this;

    push();
    {
      rectMode(CENTER);

      noFill().stroke('#0f91db').strokeWeight(2);
      rect(32, round(height * 1/4), BAR_WIDTH + 4, BAR_HEIGHT + 4);
      fill('#0f91db').noStroke();
      rect(32, round(height * 1/4), BAR_WIDTH, BAR_HEIGHT * (1 - basicReloadTimer / BASIC_RELOAD_TIME));

      noFill().stroke('#db810f').strokeWeight(2);
      rect(32, round(height * 3/4), BAR_WIDTH + 4, BAR_HEIGHT + 4);
      fill('#db810f').noStroke();
      rect(32, round(height * 3/4), BAR_WIDTH, BAR_HEIGHT * (1 - missileReloadTimer / MISSILE_RELOAD_TIME));
    }
    pop();
  }

  canFire(weaponType: WeaponType): boolean {
    switch (weaponType) {
      case WeaponType.Basic: return this.basicReloadTimer === 0;
      case WeaponType.Missile: return this.missileReloadTimer === 0;
    }
  }

  tryFire(weaponType: WeaponType): boolean {
    switch (weaponType) {
      case WeaponType.Basic: {
        if (this.basicReloadTimer > 0) return false;
        this.basicReloadTimer = BASIC_RELOAD_TIME;
        return true;
      }
      case WeaponType.Missile: {
        if (this.missileReloadTimer > 0) return false;
        this.missileReloadTimer = MISSILE_RELOAD_TIME;
        return true;
      }
    }
  }
}
