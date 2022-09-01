import ViewManager from './framework/view-manager/view-manager.js';
import SplashView from './views/splash-view.js';

export const CANVAS_SCALE = 2;

globalThis.setup = function (): void {
  createCanvas(480, 320).style('display: none;');
  pixelDensity(1);

  setTimeout(() => {
    select('canvas')?.style(`display: block; width: ${width*CANVAS_SCALE}px; height: ${height*CANVAS_SCALE}px;`);
  }, 0);

  ViewManager.transitionTo(new SplashView());
};

globalThis.draw = function (): void {
  background(0, 0);

  ViewManager.update();
  ViewManager.draw();
};
