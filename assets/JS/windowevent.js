
document.getElementById('canvas').addEventListener('click', startGame);


function startGame() {

    window.addEventListener('keydown', preventScroll);


    console.log('Game started!');
}


function preventScroll(event) {
    const keysToPreventScroll = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];

    if (keysToPreventScroll.includes(event.key)) {
        event.preventDefault();
    }
}

var player1Name = '';
var player2Name = '';

function handlePlayerName(player, inputId) {
    var inputElement = document.getElementById(inputId);
    var nameElement = document.getElementById(player + 'Name');
    var otherPlayer = player === 'player1' ? 'player2' : 'player1';

    if (inputElement.value !== '') {
        nameElement.innerText = inputElement.value;
        inputElement.style.display = 'none';

        if (player === 'player1') {
            player1Name = inputElement.value;
        } else {
            player2Name = inputElement.value;
        }

        if (player1Name !== '' && player2Name !== '') {

            resetCanvas();
        }
    }
}


function resetCanvas() {

    const confirmed = confirm("Are you sure you want to reset the match?");

    if (confirmed) {

        console.log("Canvas reset!");


        location.reload();
    }
}


function enterName() {
    let name = '';

    while (name === '') {
        name = prompt("Please enter your name:");
    }


    const nameContainer = document.getElementById('nameContainer');
    const nameElement = document.createElement('h3');
    nameElement.textContent = name;
    nameContainer.insertBefore(nameElement, nameContainer.firstChild);


    activateCanvas();
}


function activateCanvas() {

    console.log('Canvas activated! Game logic starts...');
}


document.getElementById('canvas').addEventListener('click', enterName);



// Description: This function will change the html in the main index file that currently RESIDES WITHIN THE H3 TAGS. This will change the username to match the input by the user provided matching the ID of player1input and player2input.

function changeName() {
    document.getElementById('player1Name').innerHTML = document.getElementById('player1input').value;
    document.getElementById('player2Name').innerHTML = document.getElementById('player2input').value;
}

