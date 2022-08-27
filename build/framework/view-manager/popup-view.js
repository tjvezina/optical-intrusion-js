import View from './view.js';
import ViewManager from './view-manager.js';
export default class PopupView extends View {
    close() {
        ViewManager.closePopup();
    }
}
//# sourceMappingURL=popup-view.js.map