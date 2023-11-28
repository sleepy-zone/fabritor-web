export default [
  {
    key: 'line-1',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-linecap="butt" fill="none"></line></svg>'
  },
  {
    key: 'dash-line-1',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-dasharray="3,1" stroke-linecap="butt" fill="none"></line></svg>`,
    options: {
      strokeDashArray: [12, 2]
    }
  },
  {
    key: 'dash-line-2',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44,44,44)" fill="rgb(44,44,44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-dasharray="1,1" stroke-linecap="butt" fill="none"></line></svg>',
    options: {
      strokeDashArray: [2, 2]
    }
  },
  {
    key: 'arrow-line-1',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" stroke="#000000" fill="#000000">
    <line x1="0" x2="51" y1="20" y2="20" stroke-linecap="butt" fill="none" strokeWidth="4" />
    <path d="M 51 20 V 23 L 56 20 L 51 17 Z"></path>
  </svg>`,
    options: {
      subType: 'arrowline',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 20" stroke="#000000" fill="#000000">
      <line x1="0" x2="290" y1="10" y2="10" stroke-linecap="butt" fill="none" strokeWidth="4" />
      <path d="M 290 10 V 15 L 300 10 L 290 5 Z"></path>
    </svg>`
    }
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