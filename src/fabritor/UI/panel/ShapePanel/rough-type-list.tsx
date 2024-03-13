import roughRectIcon from '@/assets/rough/rect.png';
import roughLineIcon from '@/assets/rough/line.png';
import roughCircleIcon from '@/assets/rough/circle.png';
import roughEllipseIcon from '@/assets/rough/ellipse.png';
import roughRightAngleIcon from '@/assets/rough/right-angle.png';
import roughDiamondIcon from '@/assets/rough/diamond.png';

const DEFAULT_ROUGH_CONFIG = {
  hachureGap: 16,
  fillWeight: 4,
  strokeWidth: 8,
  roughness: 1.6,
  bowing: 1,
}

export default [
  {
    key: 'rough-line',
    elem: roughLineIcon,
    options: {
      stroke: '#E36255',
      ...DEFAULT_ROUGH_CONFIG
    }
  },
  {
    key: 'rough-rect',
    elem: roughRectIcon,
    options: {
      fill: '#F6C445',
      stroke: '#EC6A52',
      ...DEFAULT_ROUGH_CONFIG
    }
  },
  {
    key: 'rough-circle',
    elem: roughCircleIcon,
    options: {
      fill: '#F6C445',
      stroke: '#EC6A52',
      ...DEFAULT_ROUGH_CONFIG
    }
  },
  {
    key: 'rough-ellipse',
    elem: roughEllipseIcon,
    options: {
      fill: '#F6C445',
      stroke: '#EC6A52',
      ...DEFAULT_ROUGH_CONFIG
    }
  },
  {
    key: 'rough-right-angle',
    elem: roughRightAngleIcon,
    options: {
      fill: '#F6C445',
      stroke: '#EC6A52',
      ...DEFAULT_ROUGH_CONFIG
    }
  },
  {
    key: 'rough-diamond',
    elem: roughDiamondIcon,
    options: {
      fill: '#F6C445',
      stroke: '#EC6A52',
      ...DEFAULT_ROUGH_CONFIG
    }
  }
]