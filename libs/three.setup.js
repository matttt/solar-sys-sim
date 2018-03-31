var camera, scene, renderer, controls, gui, mesh

const CAM_INIT_POS = vec(0,0,30000)

init()
animate()

function init() {

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000000)
  camera.position.z = CAM_INIT_POS.z
  camera.__dirtyPosition = true

  scene = new THREE.Scene()

  controls = new THREE.OrbitControls(camera)

  gui = new dat.gui.GUI()
  gui.remember(guiOpts)
  

  controls.enableDamping = true
  controls.autoRotate = false
  controls.rotateSpeed = .5
  controls.dampingFactor = 1.5

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  projectInit()

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

}

function animate() {
  loop()

  controls.update()
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}



