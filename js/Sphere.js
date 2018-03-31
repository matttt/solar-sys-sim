class Sphere {
  constructor(posVec, radius, color) {
    this.pos = posVec
    this.radius = radius
    this.color = color
    this.trail = '#FFFFFF'
    this.mesh = makeSphere(radius, this.posVec, this.color)
    this.vel = vec()
    this.acc = vec()
    this.count = 0
    this.m = 1
    this.prefix = ''

    this.mesh.__dirtyPosition = true
  }

  applyForce(f) {
    this.acc = f
  }

  update() {
    const dt = 3
    const g = guiOpts

    this.color = g[this.prefix + 'c']
    this.m = this.baseMass * g[this.prefix + 'm'] * 1000
    this.trail = g[this.prefix + 'tc']
    this.mesh.geometry.radius = g[this.prefix + 'r']
    this.vel = this.vel.clone().add(this.acc.multiplyScalar(dt))
    this.pos = this.pos.clone().add(this.vel)
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z)
  }

  leaveTrail() {
    this.count += 1

    if (this.count % 10 === 0) makeSphere(this.radius / 5, this.pos, this.trail)
  }
}