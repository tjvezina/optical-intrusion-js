/* eslint-disable */
// This file will add both p5 instanced and global intellisense
import * as p5Global from 'p5/global';
import module = require('p5');
export = module;
export as namespace p5;

declare global {
  // p5.collide2D
  function collideCircleCircle(x1: number, y1: number, diam1: number, x2: number, y2: number, diam2: number): boolean;
  function collideRectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean;
  function collideRectCircle(rx: number, ry: number, rw: number, rh: number, cx: number, cy: number, diam: number): boolean;
}
