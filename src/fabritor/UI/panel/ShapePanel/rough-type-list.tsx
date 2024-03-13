import roughRectIcon from '@/assets/rough/rect.png';
import roughLineIcon from '@/assets/rough/line.png';

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
  }
]