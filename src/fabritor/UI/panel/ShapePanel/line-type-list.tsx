import { fabric } from 'fabric';

export default [
  {
    key: 'line',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-linecap="butt" fill="none"></line></svg>',
    options: {
      start: [0, 0],
      end: [300, 0],
      strokeWidth: 4,
      stroke: '#000000',
    }
  },
  {
    key: 'dash-line',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-dasharray="3,1" stroke-linecap="butt" fill="none"></line></svg>`,
    options: {
      start: [0, 0],
      end: [300, 0],
      strokeWidth: 4,
      strokeDashArray: [8, 8],
      stroke: '#000000',
    }
  },
  {
    key: 'arrow-line-1',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)">
    <line x1="0" x2="51" y1="20" y2="20" stroke-linecap="butt" fill="none" strokeWidth="4" />
    <path d="M 51 20 V 23 L 56 20 L 51 17 Z"></path></svg>`,
    options: {
      // path: 'M0 0 L290 0L290 10L305 0L290 -10L290 0',
      start: [0, 0],
      end: [300, 0],
      arrow: [
        ['M', 285, 0],
        ['L', 285, 10],
        ['L', 300, 0],
        ['L', 285, -10],
        ['L', 285, 0]
      ],
      strokeWidth: 4,
      stroke: '#000000',
      fill: '#000000',
      strokeLineJoin: 'round',
      strokeLineCap: 'round',
      middleIndex: 2,
      sub_type: 'arrow'
    }
  },
  {
    key: 'arrow-line-2',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.25" stroke-linecap="butt" fill="none"></line><g transform="translate(33)"><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M -2.5,-1.5,-0.5,0,-2.5,1.5"></path></g></svg>',
    options: {
      path: 'M0 0 L305 0L290 -10M305 0L290 10',
      start: [0, 0],
      end: [300, 0],
      arrow: [
        ['M', 285, -10],
        ['L', 300, 0],
        ['L', 285, 10]
      ],
      strokeWidth: 4,
      stroke: '#000000',
      fill: '#00000000',
      strokeLineJoin: 'round',
      strokeLineCap: 'round',
      middleIndex: 1,
      sub_type: 'arrow'
    }
  },
]