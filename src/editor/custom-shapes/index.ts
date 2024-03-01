import { createFTextClass } from './FText';
import { createFImageClass } from './FImage';
import { createFLineClass } from './FLine';
import { createFArrowClass, createFTriArrowClass } from './FArrow';

export default function () {
  createFTextClass();
  createFImageClass();
  createFLineClass();
  createFArrowClass();
  createFTriArrowClass();
}