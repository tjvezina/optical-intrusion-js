export var ColliderType;
(function (ColliderType) {
    ColliderType[ColliderType["Circle"] = 0] = "Circle";
    ColliderType[ColliderType["Rect"] = 1] = "Rect";
})(ColliderType || (ColliderType = {}));
export default class Collider {
    constructor(actor) {
        this.hasCollided = false;
        this.actor = actor;
    }
}
//# sourceMappingURL=collider.js.map