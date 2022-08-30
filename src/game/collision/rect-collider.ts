import Collider from './collider.js';

export default class RectCollider extends Collider {
  get x(): number { return this.actor.pos.x - this.actor.size.x/2; }
  get y(): number { return this.actor.pos.y - this.actor.size.y/2; }

  get width(): number { return this.actor.size.x; }
  get height(): number { return this.actor.size.y; }
}
