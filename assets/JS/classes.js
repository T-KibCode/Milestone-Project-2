class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1 }) {
        this.position = position
        this.width = 50
        this.height = 150
        //* creates image within javascript property using native API *//
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale 
        this.framesMax = framesMax
        //* using below ref to keep background image static *// 
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 4
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            //* the image width, divided by the amount of frames I have created by chopping up the image into 6 frames *//
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

     //* this.framesMax - 1 is to stop the flickering effect by subtracting the black frame in the rear background animation loop *//

    update() {
        this.draw()
        this.framesElapsed ++

        if(this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
            } else {
            this.framesCurrent = 0
            }
        }
    }

}

class Fighter {
    constructor({position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //* This is where Attack box is drawn *//

        if (this.isAttacking) {
            c.fillStyle = 'green',
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.position.width, 
                this.attackBox.position.height,
            )
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y 
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
           this.isAttacking = false
        }, 100)
    }
}
