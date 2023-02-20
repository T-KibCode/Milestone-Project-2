const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
 
const gravity = 0.7
class Sprite {
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
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // This is where Attack box is drawn //

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

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x:0,
        y:0
    },
})

player.draw()

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x:-50,
        y:0
    },
})

enemy.draw()

console.log(player);

const keys = {
    a: {
        pressed: false
    }, 
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

//* rectangular collision *// 

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
            rectangle2.position.x && 
        rectangle1.attackBox.position.x <= 
            rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= 
            rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

//* function that tracks *// 

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //* player movement per pixel direction dependent *//

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    //* Enemy movement per pixel direction depedent *//
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }


    // detect collision //
    if(
        rectangularCollision({
        rectangle1: player,
        rectangle2: enemy,
    }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        console.log('playerattack successful')
    }

    if(
        rectangularCollision({
        rectangle1: enemy,
        rectangle2: player,
    }) &&
        player.isAttacking
    ) {
        enemy.isAttacking = false
        console.log('enemyattack successful')
    }
}

animate()



//* event listeners that track when a button input for the game is pressed and depressed based on true/false values //*

//* Player character control *//
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a' 
            break
        case 'w':
            player.velocity.y = -15
            break
        case ' ':
            player.attack()
            break


        //* enemy character control *//
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft' 
            break
        case 'ArrowUp':
            enemy.velocity.y = -15
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            break

    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        // player key off events
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case ' ':
            player.attack
            break

        // enemy key off 
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
    

        
    }
    console.log(event.key);
})

