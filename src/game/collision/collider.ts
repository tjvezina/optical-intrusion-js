import type Actor from '../actor.js';

export enum ColliderType {
  Circle,
  Rect,
}

export default abstract class Collider {
  actor: Actor;
  hasCollided = false;

  constructor(actor: Actor) {
    this.actor = actor;
  }
}
