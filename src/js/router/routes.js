define({
  '/home': () => { require(['page/home'], (home) => { home()}) },
  '/user': () => { require(['page/user'], (user) => { user()}) },
  '/report': () => { require(['page/report'], (report) => { report()}) },
  '/warning': () => { require(['page/warning'], (warning) => { warning()}) }
})