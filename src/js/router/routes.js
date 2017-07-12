define({
  '/aa': () => { require(['page/pa'], (a) => {a()}) },
  '/bb': () => { require(['page/pb'], (b) => {b()}) },
  '/cc': () => { require(['page/pc'], (c) => {c()}) },
})