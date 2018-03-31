const SHIP = 0
const EARTH = 1
const MOON = 2
const G = xEtoY(6.7, -11)
const g = guiOpts

let ship, earth, moon
let stars = []
let bodies = []

function projectInit() {

  initUi()

  initBodies(guiOpts)

  if (g.stars) makeStars(50)

}

function loop() {
  
  let forces = calcForces();

  ship.applyForce(forces[SHIP])
  earth.applyForce(forces[EARTH])
  moon.applyForce(forces[MOON])

  if (guiOpts.trails) {
    ship.leaveTrail(ship.pos)
    moon.leaveTrail(moon.pos)
    earth.leaveTrail(earth.pos)
  }
  
  if (g.stars) makeStars(2)

  ship.update()
  earth.update()
  moon.update()

  let cp = camera.position
  cp.set(cp.x + 500, cp.y, cp.z)

  controls.target = ship.pos

  if (starCount > 500) cleanStars(1);
}

