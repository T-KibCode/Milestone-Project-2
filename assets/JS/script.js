// function to draw a rectangle for the canvas element *//
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// variables to draw the sprites for the canvas element backgrounds and shop element *//
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
});

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
});

// variable to animate sprites *//
const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/GenichiroAssets/Idleright.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './assets/GenichiroAssets/Idleright.png',
            framesMax: 8
        },
        run1: {
            imageSrc: './assets/GenichiroAssets/Runright.png',
            framesMax: 8,

        },
        jump: {
            imageSrc: './assets/GenichiroAssets/Jumpright.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './assets/GenichiroAssets/Fallright.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './assets/GenichiroAssets/Attack1right.png',
            framesMax: 6,
        }
    },

    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    }
});

player.draw();

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './assets/IsshinAssets/Idleleft.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: './assets/IsshinAssets/Idleleft.png',
            framesMax: 4
        },
        run1: {
            imageSrc: './assets/IsshinAssets/Runleft.png',
            framesMax: 8,

        },
        jump: {
            imageSrc: './assets/IsshinAssets/Jumpleft.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './assets/IsshinAssets/Fallleft.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './assets/IsshinAssets/Attack1left.png',
            framesMax: 4,
        }
    },
    attackBox: {
        offset: {
            x: -165,
            y: 50
        },
        width: 165,
        height: 50
    }
});

enemy.draw();

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
};

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //* player movement per pixel direction dependent *//
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -8;
        player.switchSprite('run1');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 8;
        player.switchSprite('run1');
    } else {
        player.switchSprite('idle');
    }

    //* jumping player *//
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    //* Enemy movement per pixel direction depedent *//
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -8;
        enemy.switchSprite('run1');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 8;
        enemy.switchSprite('run1');
    } else {
        enemy.switchSprite('idle');
    }

    //* Enemy jumping *//
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    //* detect collision *//

    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy,
        }) &&
        player.isAttacking &&
        player.framesCurrent === 4
    ) {
        player.isAttacking = false;
        enemy.health -= 10;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player,
        }) &&
        enemy.isAttacking &&
        enemy.framesCurrent === 2
    ) {
        enemy.isAttacking = false;
        player.health -= 10;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }

    //if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    //end game based on health //
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
}

animate();



//* event listeners that track when a button input for the game is pressed and depressed based on true/false values //*

//* Player character control *//
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -15;
            break;
        case ' ':
            player.attack();
            break;


        //* enemy character control *//
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -15;
            break;
        case 'ArrowDown':
            enemy.attack();
            break;

    }

});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // player key off events
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case ' ':
            player.attack();
            break;

        // enemy key off 
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            enemy.isAttacking = true;
            break;



    }

});
