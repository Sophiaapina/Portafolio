// Define audio files
var tom1 = new Audio('sounds/tom-1.mp3');
var tom2 = new Audio('sounds/tom-2.mp3');
var tom3 = new Audio('sounds/tom-3.mp3');
var tom4 = new Audio('sounds/tom-4.mp3');
var snare = new Audio('sounds/snare.mp3');
var crash = new Audio('sounds/crash.mp3');
var kickBass = new Audio('sounds/kick-bass.mp3');

// Map drum keys to corresponding audio files and background images
var drumMapping = {
  'w': { audio: tom1, image: 'images/tom1.png' },
  'a': { audio: tom2, image: 'images/tom2.png' },
  's': { audio: tom3, image: 'images/tom3.png' },
  'd': { audio: tom4, image: 'images/tom4.png' },
  'j': { audio: snare, image: 'images/snare.png' },
  'k': { audio: crash, image: 'images/crash.png' },
  'l': { audio: kickBass, image: 'images/kick.png' }
};

// Function to handle button clicks
function playDrum(key) {
  var drum = drumMapping[key];
  if (drum) {
    drum.audio.play();
    animateButton(key);
    alert("Key pressed: " + key);
  }
}

// Function to animate button press
function animateButton(key) {
  var button = document.querySelector("." + key);
  button.classList.add("pressed");

  // Revert the style after a short delay
  setTimeout(function() {
    button.classList.remove("pressed");
  }, 100);
}

// Add event listeners for button clicks
var buttons = document.querySelectorAll(".drum");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    var buttonKey = this.textContent;
    playDrum(buttonKey);
  });
});

// Add event listener for keypress
document.addEventListener("keypress", function(event) {
  var keyPressed = event.key;
  if ("wasdjkl".includes(keyPressed)) {
    playDrum(keyPressed);
  }
});
