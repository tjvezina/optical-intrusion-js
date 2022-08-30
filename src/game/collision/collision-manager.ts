import { assert } from '../../framework/debug.js';
import CircleCollider from './circle-collider.js';
import Collider from './collider.js';
import RectCollider from './rect-collider.js';

export interface CollisionListener {
  onCollision: (a: Collider, b: Collider) => void;
}

export default class CollisionManager {
  static instance: CollisionManager | null = null;

  listener: CollisionListener;

  colliders: Collider[] = [];
  collidersToAdd: Collider[] = [];
  collidersToRemove: Collider[] = [];

  constructor(listener: CollisionListener) {
    assert(CollisionManager.instance === null, 'A collision manager instance already exists');
    CollisionManager.instance = this;

    this.listener = listener;
  }

  dispose(): void {
    CollisionManager.instance = null;
  }

  addCollider(collider: Collider): void {
    this.collidersToAdd.push(collider);
  }

  removeCollider(collider: Collider): void {
    this.collidersToRemove.push(collider);
  }

  update(): void {
    this.colliders.forEach(collider => { collider.hasCollided = false; });

    this.checkCollision();

    this.collidersToRemove.forEach(collider => { collider.actor.collider = undefined; });
    this.colliders = this.colliders.filter(collider => !this.collidersToRemove.includes(collider));
    this.collidersToRemove.length = 0;

    this.colliders.push(...this.collidersToAdd);
    this.collidersToAdd.length = 0;
  }

  checkCollision(): void {
    for (let i = 0; i < this.colliders.length - 1; i++) {
      for (let j = i + 1; j < this.colliders.length; j++) {
        const a = this.colliders[i];
        const b = this.colliders[j];

        if (a instanceof CircleCollider) {
          if (b instanceof CircleCollider && collideCircleCircle(a.x, a.y, a.diam, b.x, b.y, b.diam)) {
            this.handleCollision(a, b);
          } else if (b instanceof RectCollider && collideRectCircle(b.x, b.y, b.width, b.height, a.x, a.y, a.diam)) {
            this.handleCollision(a, b);
          }
        } else if (a instanceof RectCollider) {
          if (b instanceof CircleCollider && collideRectCircle(a.x, a.y, a.width, a.height, b.x, b.y, b.diam)) {
            this.handleCollision(a, b);
          } else if (b instanceof RectCollider && collideRectRect(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)) {
            this.handleCollision(a, b);
          }
        }
      }
    }
  }

  handleCollision(a: Collider, b: Collider): void {
    a.hasCollided = true;
    b.hasCollided = true;
    this.listener.onCollision(a, b);
  }
}
