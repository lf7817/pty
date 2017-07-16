define(() =>{
  function loadPage(name) {
    return () => {
      require(['text!tpl/' + name + '.html'], (tpl) => {
        document.getElementById('router-view').innerHTML = tpl
        require(['page/'+name], (p) => { p()})
      })
    }
  }

  return {
    '/home': loadPage('home'),
    '/user': loadPage('user'),
    '/report': loadPage('report'),
    '/warning': loadPage('warning'),
    '/login': loadPage('login'),
    '/setpwd': loadPage('setpwd')
  }
})

