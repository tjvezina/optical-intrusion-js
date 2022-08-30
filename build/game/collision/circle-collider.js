import Collider from './collider.js';
export default class CircleCollider extends Collider {
    get x() { return this.actor.pos.x; }
    get y() { return this.actor.pos.y; }
    get diam() { return max(this.actor.size.x, this.actor.size.y); }
}
//# sourceMappingURL=circle-collider.js.map