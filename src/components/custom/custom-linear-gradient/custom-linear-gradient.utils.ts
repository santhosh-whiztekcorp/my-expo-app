import { type GradientDirection } from './custom-linear-gradient.types';

export const getDirectionPoints = (direction?: GradientDirection) => {
  switch (direction) {
    case 'to-top':
      return { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } };
    case 'to-bottom':
      return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
    case 'to-left':
      return { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } };
    case 'to-right':
      return { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
    case 'to-top-right':
      return { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } };
    case 'to-top-left':
      return { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } };
    case 'to-bottom-right':
      return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
    case 'to-bottom-left':
      return { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } };
    default:
      return { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };
  }
};
