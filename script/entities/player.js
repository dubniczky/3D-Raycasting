class Player {
    constructor() {
        this.raySpacing = 0.5
        this.fov = 45
        this.pos = createVector(sceneW / 2, sceneH / 2)
        this.rays = []
        this.heading = 0
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.raySpacing) {
            this.rays.push(new Ray(this.pos, radians(a)))
        }
    }

    updateFOV(fov) {
        this.fov = fov
        this.rays = []
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.raySpacing)
        {
            this.rays.push(new Ray(this.pos, radians(a) + this.heading))
        }
    }

    rotate(angle) {
        this.heading += angle
        let index = 0
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.raySpacing)
        {
            this.rays[index].setAngle(radians(a) + this.heading)
            index++
        }
    }

    moveForward(amt) {
        const dir = p5.Vector.fromAngle(this.heading)
        dir.setMag(amt)
        this.pos.add(dir)
    }
    moveSide(amt) {
        const dir = p5.Vector.fromAngle(this.heading + Math.PI / 2)
        dir.setMag(amt)
        this.pos.add(dir)
    }

    update(x, y) {
        this.pos.set(x, y)
    }

    drawSight(walls) {
        const scene = []
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i]
            let closest = null
            let record = Infinity
            for (let wall of walls) {
                for (let j = 0; j < wall.bounds.length; j++) {
                    const pt = ray.cast(wall.bounds[j])
                    if (pt) {
                        let d = p5.Vector.dist(this.pos, pt)
                        const a = ray.dir.heading() - this.heading
                        d *= cos(a) //Fix fish eye
                        if (d < record){
                            record = d
                            closest = pt
                        }
                    }
                }
            }
            if (closest) {
                stroke(30, 200, 50, 100)
                line(this.pos.x, this.pos.y, closest.x, closest.y)

                //fill(255, 255, 0, 20 + 1/record)
                var bightness = 55 + (1-record/diagonal) * 200
                fill(bightness, bightness, 0)
                noStroke()
                ellipse(closest.x, closest.y, 5)
            }
            scene[i] = record
        }
        return scene
    }

    draw() {
        fill(255)
        ellipse(this.pos.x, this.pos.y, 4)
    }
}
