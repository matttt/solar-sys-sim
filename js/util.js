function vec(x, y, z) {
  return new THREE.Vector3(x, y, z)
}

let starCount = 0

function clearScene() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0])
  }
}

function makeSphere(r_, p_, c_, g_) {
  let p = p_ || vec()
  var geometry = new THREE.SphereGeometry(r_, g_ || 10, g_ || 10)
  var material = new THREE.MeshBasicMaterial({ color: c_ })

  mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(p.x, p.y, p.z)

  scene.add(mesh)

  return mesh
}

function makeStars(num) {
  for (var i = 0; i < num; i++) {
    const starX = ship.pos.x + (-Math.random() * 100000 + 50000) + 50000
    const starY = ship.pos.y + (-Math.random() * 100000 + 50000)
    const starZ = ship.pos.z + (-Math.random() * 100000 + 50000)
    const starPos = vec(starX, starY, starZ)

    let star = makeSphere(Math.random() + 5 * 25, starPos, '#FFFFFF', 3)
    stars.push(star)

    starCount++
  }
}

function cleanStars(num) {
  for (let i = 0; i < num; i++) scene.remove(stars.shift())
}

function xEtoY(x, y) {
  return x * Math.pow(10, y)
}

function initBody(prefix, mass) {
  const g = guiOpts

  let body = new Sphere(vec(g[prefix + 'x'], g[prefix + 'y'], g[prefix + 'z']), 1000, g[prefix + 'c'])
  body.baseMass = xEtoY(mass[0], mass[1])
  body.vel = vec(g[prefix + 'vx'], g[prefix + 'vy'], g[prefix + 'vz'])
  body.acc = vec()
  body.m = xEtoY(mass[0], mass[1]) * g[prefix + 'm'] * 1000
  body.trail = g[prefix + 'tc']
  body.prefix = prefix

  return body
}


function initBodies(bodies, guiOpts) {
  let g = guiOpts

  clearScene()

  ship = initBody('s', [4,16])
  earth = initBody('e', [6,8])
  moon = initBody('m', [6,8])
}

function calcForces() {

  const shipPos = [ship.pos.x, ship.pos.y, ship.pos.z, ship.m]
  const earthPos = [earth.pos.x, earth.pos.y, earth.pos.z, earth.m]
  const moonPos = [moon.pos.x, moon.pos.y, moon.pos.z, moon.m]
  const shipToEarth = vecFromTo(shipPos, earthPos)
  const moonToEarth = vecFromTo(moonPos, earthPos)
  const shipToMoon = vecFromTo(shipPos, moonPos)
  const shipEarthD = distance(shipPos, earthPos)
  const moonEarthD = distance(moonPos, earthPos)
  const shipMoonD = distance(shipPos, moonPos)

  //calculating gravitational forces

  const shipEarthF = (G * guiOpts.gravity * ((ship.m * earth.m) / Math.pow(distance(shipPos, earthPos), 2)))
  const moonEarthForce = (G * guiOpts.gravity * ((moon.m * earth.m) / Math.pow(distance(moonPos, earthPos), 2)))
  const shipMoonForce = (G * guiOpts.gravity * ((ship.m * moon.m) / Math.pow(distance(shipPos, moonPos), 2)))


  //adjusting motion to account for gravitational forces

  const shipF1 = vecTimesC(shipToEarth, shipEarthD).multiplyScalar(shipEarthF / ship.m)
  const shipF2 = vecTimesC(shipToMoon, shipMoonD).multiplyScalar(shipMoonForce / ship.m)
  const earthF1 = vecTimesC(shipToEarth, shipEarthD).multiplyScalar(-1 * shipEarthF / earth.m)
  const earthF2 = vecTimesC(moonToEarth, moonEarthD).multiplyScalar(-1 * moonEarthForce / earth.m);
  const moonF1 = vecTimesC(moonToEarth, moonEarthD).multiplyScalar(moonEarthForce / moon.m)
  const moonF2 = vecTimesC(shipToMoon, shipMoonD).multiplyScalar(-1 * shipMoonForce / moon.m)

  let shipF = shipF1.add(shipF2)
  let earthF = earthF1.add(earthF2)
  let moonF = moonF1.add(moonF2)

  let forces = []
  forces[SHIP] = shipF
  forces[EARTH] = earthF
  forces[MOON] = moonF

  return forces
}


function distance(p0, p1) {
  const xDiff = p0[0] - p1[0]
  const yDiff = p0[1] - p1[1]
  const zDiff = p0[2] - p1[2]
  const val = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2) + Math.pow(zDiff, 2))
  return val
}

function vecFromTo(p1, p0) {
  return [p0[0] - p1[0], p0[1] - p1[1], p0[2] - p1[2]]
}

function vecTimesC(p0, c) {
  return vec(p0[0] / c, p0[1] / c, p0[2] / c)
}
