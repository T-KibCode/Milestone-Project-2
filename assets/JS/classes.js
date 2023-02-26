class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0 , y:0} }) {
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
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            //* the image width, divided by the amount of frames I have created by chopping up the image into 6 frames *//
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

     //* this.framesMax - 1 is to stop the flickering effect by subtracting the black frame in the rear background animation loop *//
    animateFrames() {
        this.framesElapsed ++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
            } else {
            this.framesCurrent = 0
            }
        }
    }


    update() {
        this.draw()
        this.animateFrames()
    }

}

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red',  
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = { x: 0, y: 0},
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 4
        this.sprites = sprites

        for (const sprite in sprites) {
            //this is the object class im looping over//
           sprites[sprite].image = new Image()
           sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        
    }



    update() {
        this.draw()
        this.animateFrames()
        
        // attack boxes //
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        //This is where I had drawn an attackBox over the sprite images to show the hitboxes. Commented out the draw boxes.
        //c.fillRect(
            //this.attackBox.position.x, 
            //this.attackBox.position.y, 
           // this.attackBox.width, 
            //this.attackBox.height
           // )
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 

        // gravity function //
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330
        } else this.velocity.y += gravity
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
    }

    takehit() {
        this.switchSprite('takeHit')
        this.health -= 20
    }

    switchSprite(sprite) {
        //overring all other animations with the attack animation // 
        if (
            this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax -1 
        ) 
            return

            // override when fighter gets hit //
        if (
            this.image === this.sprites.takeHit.image && 
            this.framesCurrent < this.sprites.takeHit.framesMax -1
        )
            return
        
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
            }
            break;
            case 'run1':
                if (this.image !== this.sprites.run1.image) {
                this.image = this.sprites.run1.image
                this.framesMax = this.sprites.run1.framesMax
                this.framesCurrent = 0
                }
            break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
            }
            break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
            }
            break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0
            }
            break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.framesCurrent = 0
            }
        }
    }
}
