const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
 
const gravity = 0.7

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
})

const shop = new Sprite ({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
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
    imageSrc: './assets/GenichiroAssets/Idle right.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215, 
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './assets/GenichiroAssets/Idle right.png',
            framesMax: 8
        },
        run1: {
            imageSrc: './assets/GenichiroAssets/Run right.png',
            framesMax: 8,
            image: new Image()
        },
        run2: {
            imageSrc: './assets/GenichiroAssets/Run left.png',
            framesMax: 8,
            image: new Image()
        }
    }
})

player.draw()

const enemy = new Fighter({
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

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    // enemy.update() //

    player.velocity.x = 0
    enemy.velocity.x = 0

    //* player movement per pixel direction dependent *//
    player.image = player.sprites.idle.image
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.image = player.sprites.run2.image
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.image = player.sprites.run1.image
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
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if(
        rectangularCollision({
        rectangle1: enemy,
        rectangle2: player,
    }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //end game based on health //
    if(enemy.health <= 0 || player.health <= 0 ) {
        determineWinner({player, enemy, timerId})
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
            player.attack()
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
            enemy.isAttacking = true
            break
    

        
    }
    
})
