export const IndexPresetColors = [
  '#F3B7AD',
  '#F1B2B2',
  '#9AC5E5',
  {
    type: 'linear',
    gradientUnits: 'percentage',
    coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
    colorStops: [{ offset: 0, color: '#f3b7ad' }, { offset: 1, color: '#fad4a6' }],
    css: `linear-gradient(90deg, ${[{ offset: 0, color: '#f3b7ad' }, { offset: 1, color: '#fad4a6' }].map(stop => `${stop.color} ${stop.offset * 100}%`)})`
  },
  {
    type: 'linear',
    gradientUnits: 'percentage',
    coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
    colorStops: [{ offset: 0, color: '#fad4a6' }, { offset: 1, color: '#a9d0e1' }],
    css: `linear-gradient(90deg, ${[{ offset: 0, color: '#fad4a6' }, { offset: 1, color: '#a9d0e1' }].map(stop => `${stop.color} ${stop.offset * 100}%`)})`
  }
];

export const AllPresetColors = [
  ...IndexPresetColors
]

