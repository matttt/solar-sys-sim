var guiOpts = {
  'gravity': 1,

  sx: 0,
  sy: 0,
  sz: 0,
  svx: 500,
  svy: 0,
  svz: 0,
  sm: 1,
  sc: '#FF0000',
  sr: 1000,
  stc: '#FF0000',
  
  //moon
  mx: 20000,
  my: 0,
  mz: 0,
  mvx: 500,
  mvy: 500,
  mvz: -250,
  mm: .3,
  mc: '#FFFFFF',
  mr: 1000,
  mtc: '#FF0000',
  
  //earth
  ex: -20000,
  ey: 0,
  ez: 0,
  evx: 500,
  evy: -500,
  evz: -250,
  em: .3,
  ec: '#0000FF',
  er: 1000,
  etc: '#FF0000',
  
  type: 'three',
  trails: true,
  stars: false,
  restart: function () {
    initBodies(guiOpts)

    let cp = camera.position
    cp.set(0, 0, CAM_INIT_POS.z)
    camera.lookAt(ship.pos)
  }
}

function buildFolder(name, prefix) {
  var f = gui.addFolder(name)
  f.add(guiOpts, prefix+'x').min(-50000).max(50000).step(100).name('init x')
  f.add(guiOpts, prefix+'y').min(-50000).max(50000).step(100).name('init y')
  f.add(guiOpts, prefix+'z').min(-50000).max(50000).step(100).name('init z')
  f.add(guiOpts, prefix+'vx').min(-500).max(500).step(100).name('vel x')
  f.add(guiOpts, prefix+'vy').min(-500).max(500).step(100).name('vel y')
  f.add(guiOpts, prefix+'vz').min(-500).max(500).step(100).name('vel z')
  f.add(guiOpts, prefix+'m').min(-5).max(5).step(.25).name('mass')
  f.add(guiOpts, prefix+'r').min(0).max(10000).step(100).name('radius')  
  f.addColor(guiOpts, prefix+'c').name('color')
  f.addColor(guiOpts, prefix+'tc').name('trail color')
}


function initUi() {
  gui.add(guiOpts, 'restart')
  gui.add(guiOpts, 'gravity').min(-5).max(10).step(0.1)
  

  buildFolder('Ship','s')
  buildFolder('Earth','e')
  buildFolder('Moon','m')

  gui.add(guiOpts, 'trails').name('Draw Trails')
  gui.add(guiOpts, 'stars').name('Draw Stars')
}