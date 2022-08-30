import Collider from './collider.js';
export default class RectCollider extends Collider {
    get x() { return this.actor.pos.x - this.actor.size.x / 2; }
    get y() { return this.actor.pos.y - this.actor.size.y / 2; }
    get width() { return this.actor.size.x; }
    get height() { return this.actor.size.y; }
}
//# sourceMappingURL=rect-collider.js.map