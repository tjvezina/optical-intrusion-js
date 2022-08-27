import InputManager from '../input-manager.js';
export default class View {
    constructor() {
        this.isActive = false;
    }
    enable() {
        this.isActive = true;
        InputManager.addListener(this);
    }
    disable() {
        this.isActive = false;
        InputManager.removeListener(this);
    }
    dispose() {
        if (this.isActive) {
            InputManager.removeListener(this);
        }
    }
}
//# sourceMappingURL=view.js.map