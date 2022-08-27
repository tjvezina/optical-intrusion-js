import { assert } from '../debug.js';
import PopupView from './popup-view.js';
const FADE_TIME = 0.5;
let currentView = null;
let popupView = null;
let pendingView = null;
let tFade = 0;
let transitionFunc = null;
let isLoadingNextView = false;
let tLoadingFade = 0;
let drawCustomLoadingView = null;
let documentHadFocus = true;
const ViewManager = {
    get isInTransition() { return tFade < 1; },
    get popupIsOpen() { return popupView !== null; },
    transitionTo(nextView) {
        assert(!(nextView instanceof PopupView), 'Transition failed, primary view cannot be a popup');
        pendingView = nextView;
        transitionFunc = fadeOut;
    },
    openPopup(popup) {
        assert(popupView === null, 'Failed to open popup, one is already open');
        assert(currentView !== null, 'Failed to open popup, transition to a view first');
        currentView.disable();
        popupView = popup;
        popupView.enable();
    },
    closePopup() {
        assert(popupView !== null, 'Failed to close popup, no popup to close');
        assert(currentView !== null, 'Failed to close popup, transition to a view first');
        popupView.dispose();
        popupView = null;
        currentView.enable();
    },
    setLoadingViewFunc(drawLoadingView) {
        drawCustomLoadingView = drawLoadingView;
    },
    update() {
        const documentHasFocus = document.hasFocus();
        if (documentHasFocus !== documentHadFocus) {
            documentHadFocus = documentHasFocus;
            currentView?.onFocusChanged?.(documentHasFocus);
            popupView?.onFocusChanged?.(documentHasFocus);
        }
        if (transitionFunc?.() === true) {
            transitionFunc = null;
            if (pendingView !== null) {
                loadNextView();
            }
        }
        if (document.hasFocus()) {
            currentView?.update?.();
            popupView?.update?.();
        }
    },
    draw() {
        if (!isLoadingNextView) {
            currentView?.draw();
            popupView?.draw();
        }
        if (tFade < 1) {
            background(0, 255 * (1 - tFade));
        }
        if (isLoadingNextView === true) {
            (drawCustomLoadingView ?? drawDefaultLoadingView)();
        }
    },
};
async function loadNextView() {
    assert(pendingView !== null, 'Failed to load next view, no view is pending');
    isLoadingNextView = true;
    tLoadingFade = 0;
    popupView?.dispose();
    popupView = null;
    currentView?.dispose();
    currentView = pendingView;
    pendingView = null;
    await currentView.loadContent?.();
    currentView.enable();
    isLoadingNextView = false;
    transitionFunc = fadeIn;
}
function fadeIn() {
    tFade = min(1, tFade + (deltaTime / 1000) / FADE_TIME);
    return (tFade === 1);
}
function fadeOut() {
    tFade = max(0, tFade - (deltaTime / 1000) / FADE_TIME);
    return (tFade === 0);
}
function drawDefaultLoadingView() {
    tLoadingFade = min(1, tLoadingFade + (deltaTime / 1000) / FADE_TIME);
    push();
    {
        textAlign(CENTER, CENTER);
        textSize(height / 20);
        textStyle(BOLD);
        fill(200, 255 * tLoadingFade).noStroke();
        text('Loading...', width / 2, height / 2);
    }
    pop();
}
export default ViewManager;
//# sourceMappingURL=view-manager.js.map