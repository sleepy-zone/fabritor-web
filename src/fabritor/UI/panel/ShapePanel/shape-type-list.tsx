import { fabric } from 'fabric';

const degree2Radian = (d) => {
  return Math.PI * d / 180;
}

// 中心为 [0,0] 点
const getRightPolygonPoints = (num, radius = 100) => {
  const d = 360 / num;
  const points: {x: number, y: number}[] = [];
  for (let i = 0; i < num; i++) {
    const y = radius * Math.cos(degree2Radian(i * d));
    const x = radius * Math.sin(degree2Radian(i * d));
    points.push({ x: -x, y: -y });
  }
  return points;
}

export default [
  {
    key: 'rect',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 6H6V42H42V6Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Rect,
    options: { width: 200, height: 200, fill: '#555555' }
  },
  {
    key: 'rect-r',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Rect,
    options: { width: 200, height: 200, rx: 20, ry: 20, fill: '#555555' }
  },
  {
    key: 'circle',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Circle,
    options: { radius: 100, fill: '#555555' }
  },
  {
    key: 'ellipse',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="24" rx="14" ry="20" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Ellipse,
    options: { rx: 120, ry: 200, fill: '#555555' }
  },
  {
    key: 'triangle',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2692 6.98965C23.0395 5.65908 24.9565 5.65908 25.7309 6.98965L44.262 38.9979C45.0339 40.3313 44.0718 42 42.5311 42H5.4689C3.92823 42 2.96611 40.3313 3.73804 38.9979L22.2692 6.98965Z" fill="#555" stroke="#555" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    shape: fabric.Triangle,
    options: { width: 200, height: 180, fill: '#555555' }
  },
  {
    key: 'right-angle',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.1153C8 7.29468 10.2347 6.42094 11.4696 7.75874L40.9016 39.6434C42.0842 40.9246 41.1755 43 39.432 43H10C8.89543 43 8 42.1046 8 41V9.1153Z" fill="#555" stroke="#555" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>',
    shape: fabric.Polygon,
    options: { points: [{ x: 0, y: 0 }, { x: 0, y: 200 }, { x: 200, y: 200 }], fill: '#555555' }
  },
  {
    key: 'diamond',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.41421 22.5858L22.5858 5.41421C23.3668 4.63317 24.6332 4.63316 25.4142 5.41421L42.5858 22.5858C43.3668 23.3668 43.3668 24.6332 42.5858 25.4142L25.4142 42.5858C24.6332 43.3668 23.3668 43.3668 22.5858 42.5858L5.41421 25.4142C4.63317 24.6332 4.63316 23.3668 5.41421 22.5858Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Polygon,
    options: { points: [{ x: 0, y: 100 }, { x: 100, y: 200 }, { x: 200, y: 100 }, { x: 100, y: 0 }], fill: '#555555' }
  },
  {
    key: 'parallelgram',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.2796 8H15.4704C14.5956 8 13.8223 8.5685 13.5614 9.40345L4.81142 37.4035C4.40897 38.6913 5.3711 40 6.72038 40H32.5296C33.4044 40 34.1777 39.4315 34.4386 38.5965L43.1886 10.5965C43.591 9.30869 42.6289 8 41.2796 8Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Polygon,
    options: { points: [{ x: 50, y: 0 }, { x: 0, y: 100 }, { x: 200, y: 100 }, { x: 250, y: 0 }], fill: '#555555' }
  },
  {
    key: 'pentagon',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.2296 4.95843L42.8601 18.7012C43.5405 19.2316 43.8041 20.1385 43.5141 20.951L36.4739 40.6724C36.1897 41.4685 35.4357 42 34.5903 42H13.4097C12.5643 42 11.8103 41.4685 11.5261 40.6724L4.48593 20.951C4.19588 20.1385 4.45953 19.2315 5.13995 18.7012L22.7704 4.95843C23.4933 4.39496 24.5067 4.39496 25.2296 4.95843Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Polygon,
    options: { points: getRightPolygonPoints(5), fill: '#555555' }
  },
  {
    key: 'hexagon',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.0287 43.4604L7.02871 34.5715C6.39378 34.2188 6 33.5495 6 32.8232V15.1768C6 14.4505 6.39378 13.7812 7.02872 13.4285L23.0287 4.5396C23.6328 4.20402 24.3672 4.20402 24.9713 4.5396L40.9713 13.4285C41.6062 13.7812 42 14.4505 42 15.1768V32.8232C42 33.5495 41.6062 34.2188 40.9713 34.5715L24.9713 43.4604C24.3672 43.796 23.6328 43.796 23.0287 43.4604Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Polygon,
    options: { points: getRightPolygonPoints(6), fill: '#555555' }
  },
  {
    key: 'octagon',
    elem: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4102 42.3887L5.56076 32.1812C5.20103 31.8083 5 31.3105 5 30.7924V17.2076C5 16.6895 5.20103 16.1917 5.56076 15.8188L15.4102 5.61126C15.7871 5.22064 16.3066 5 16.8494 5H31.1506C31.6934 5 32.2129 5.22064 32.5898 5.61126L42.4392 15.8188C42.799 16.1917 43 16.6895 43 17.2076V30.7924C43 31.3105 42.799 31.8083 42.4392 32.1812L32.5898 42.3887C32.2129 42.7794 31.6934 43 31.1506 43H16.8494C16.3066 43 15.7871 42.7794 15.4102 42.3887Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Polygon,
    options: { points: getRightPolygonPoints(8), fill: '#555555' }
  },
  {
    key: 'trapezoid',
    elem: '<svg width="48" height="46" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.7944 8H16.2056C14.8934 8 13.7335 8.85275 13.3421 10.1052L5.21713 36.1052C4.61345 38.037 6.05665 40 8.08057 40H39.9194C41.9433 40 43.3866 38.037 42.7829 36.1052L34.6579 10.1052C34.2665 8.85275 33.1066 8 31.7944 8Z" fill="#555" stroke="#555" stroke-width="4"/></svg>',
    shape: fabric.Polygon,
    options: { points: [{ x: 50, y: 0 }, { x: 0, y: 100 }, { x: 200, y: 100 }, { x: 150, y: 0 }], fill: '#555555' }
  },
]