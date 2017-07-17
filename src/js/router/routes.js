define(() =>{
  let m = ['home', 'user', 'warning', 'report']
  let loadPage = (name) => {
    return (param) => {
      hightLightMenuBtn(name)
      require(['text!tpl/' + name + '.html'], (tpl) => {
        document.getElementById('router-view').innerHTML = tpl
        require(['page/'+name], (p) => { p(param)})
      })
    }
  }

  function hightLightMenuBtn (name) {
    if (-1 === m.indexOf(name)) return
    $('#menu ul li a').removeClass('active')
    $('#menu-' + name).attr('class', 'active')
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

