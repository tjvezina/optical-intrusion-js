import CircleCollider from './collision/circle-collider.js';
import { ColliderType } from './collision/collider.js';
import CollisionManager from './collision/collision-manager.js';
import RectCollider from './collision/rect-collider.js';
export default class Actor {
    constructor(img, colliderType) {
        this.pos = createVector(0, 0);
        this.size = createVector(0, 0);
        this.img = img;
        this.size.set(img.width, img.height);
        if (colliderType !== undefined) {
            switch (colliderType) {
                case ColliderType.Circle:
                    this.collider = new CircleCollider(this);
                    break;
                case ColliderType.Rect:
                    this.collider = new RectCollider(this);
                    break;
                default:
                    throw new Error(`Unknown collider type: ${colliderType}`);
            }
            CollisionManager.instance?.addCollider(this.collider);
        }
    }
    draw() {
        const { img, pos, size } = this;
        push();
        {
            imageMode(CENTER);
            image(img, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
}
//# sourceMappingURL=actor.js.map