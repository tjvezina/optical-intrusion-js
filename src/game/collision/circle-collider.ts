import Collider from './collider.js';

export default class CircleCollider extends Collider {
  get x(): number { return this.actor.pos.x; }
  get y(): number { return this.actor.pos.y; }

  get diam(): number { return max(this.actor.size.x, this.actor.size.y); }
}
