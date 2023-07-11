
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

function resetCanvas() {
    // Display a confirmation dialog to the user
    const confirmed = confirm("Are you sure you want to reset the canvas?");

    if (confirmed) {
        // Reset the canvas to its initial state
        // Perform the necessary actions to reset the canvas here
        console.log("Canvas reset!");

        // Reload the page to start fresh
        location.reload();
    }
}

// Function to prompt the user for their name
function enterName() {
    let name = '';
    
    while (name === '') {
        name = prompt("Please enter your name:");
    }
    
    // Display the name above the canvas
    const nameContainer = document.getElementById('nameContainer');
    const nameElement = document.createElement('h2');
    nameElement.textContent = name;
    nameContainer.insertBefore(nameElement, nameContainer.firstChild);

    // Activate the canvas and start the game logic
    activateCanvas();
}

// Function to activate the canvas and start the game logic
function activateCanvas() {
    // Add your canvas activation and game logic here
    console.log('Canvas activated! Game logic starts...');
}

// Attach the event listener to start the process
document.getElementById('canvas').addEventListener('click', enterName);
