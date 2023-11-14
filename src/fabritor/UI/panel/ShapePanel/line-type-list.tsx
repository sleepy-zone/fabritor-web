export default [
  {
    key: 'line-1',
    svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-linecap="butt" fill="none"></line></svg>'
  },
  {
    key: 'dash-line-1',
    svg: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-dasharray="3,1" stroke-linecap="butt" fill="none"></line></svg>`,
    options: {
      strokeDashArray: [15, 5]
    }
  },
  {
    key: 'dash-line-2',
    svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-dasharray="1,1" stroke-linecap="butt" fill="none"></line></svg>',
    options: {
      strokeDashArray: [5, 5]
    }
  },
  {
    key: 'arrow-line-1',
    svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="30" stroke-linecap="butt" fill="none"></line><g transform="translate(33)"><path fill="inherit" stroke-linecap="round" stroke-linejoin="round" d="M -2.5,-1.5,-0.5,0,-2.5,1.5 Z"></path></g></svg>'
  },
  // {
  //   key: 'arrow-line-2',
  //   svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.25" stroke-linecap="butt" fill="none"></line><g transform="translate(33)"><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M -2.5,-1.5,-0.5,0,-2.5,1.5 "></path></g></svg>'
  // },
  // {
  //   key: 'arrow-line-3',
  //   svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="0.75" x2="32.25" stroke-linecap="butt" fill="none"></line><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M 2.5,-1.5,0.5,0,2.5,1.5 "></path><g transform="translate(33)"><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M -2.5,-1.5,-0.5,0,-2.5,1.5 "></path></g></svg>'
  // },
  // {
  //   key: 'arrow-line-4',
  //   svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="4" x2="29" stroke-linecap="butt" fill="none"></line><rect fill="inherit" stroke-linejoin="round" width="3" height="3" x="0.5" y="-1.5"></rect><g transform="translate(33)"><rect fill="inherit" stroke-linejoin="round" width="3" height="3" x="-3.5" y="-1.5"></rect></g></svg>'
  // },
  // {
  //   key: 'arrow-line-5',
  //   svg: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="4" x2="29" stroke-linecap="butt" fill="none"></line><circle fill="inherit" cx="2" r="1.5"></circle><g transform="translate(33)"><circle fill="inherit" cx="-2" r="1.5"></circle></g></svg>'
  // }
]