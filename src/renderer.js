const { ipcRenderer } = require("electron")
const ipc = ipcRenderer;

document.querySelector("#minimize-button").addEventListener('click', ()=>{
    ipc.send("minimize")
})
document.querySelector("#maximize-button").addEventListener('click', ()=>{
    ipc.send("maximize")
})
document.querySelector("#close-button").addEventListener('click', ()=>{
    ipc.send("close")
})

const buttonStart = document.getElementById("buttonStart");

buttonStart.addEventListener("click", ()=>{
   window.location.assign("./time.html")
})


document.addEventListener('DOMContentLoaded', () => {
    const countdownDisplay = document.getElementById('countdown');
    const messageDisplay = document.getElementById('message');
    const dateDisplay = document.getElementById('date');
  
    const buttons = {
      'button30min': 30 * 60,
      'button20min': 20 * 60,
      'button10min': 10 * 60,
      'button2h': 2 * 3600,
    };
  
    let countdownInterval;
    let countdownTime;
    let alarmSound = new Audio('./assets/test.mp3');   
    function startCountdown(duration) {
      clearInterval(countdownInterval);
      countdownTime = duration;
      updateCountdownDisplay();
  
      countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
          countdownTime--;
          updateCountdownDisplay();
          if (countdownTime % 60 === 0) { // Every minute, show a motivational message
            messageDisplay.textContent = "Va travailler!";
            setTimeout(() => messageDisplay.textContent = "", 3000); // Clear message after 3 seconds
          }
        } else {
          clearInterval(countdownInterval);
          messageDisplay.textContent = "Il est l'heure!";
          alarmSound.play();
          
        }
      }, 1000);
    }
  
    function updateCountdownDisplay() {
        alarmSound.pause()
        alarmSound.currentTime = 0;
      const hours = Math.floor(countdownTime / 3600);
      const minutes = Math.floor((countdownTime % 3600) / 60);
      const seconds = countdownTime % 60;
      countdownDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    function updateDateDisplay() {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateDisplay.textContent = today.toLocaleDateString(undefined, options);
    }
  
    // Event listeners for buttons
    Object.keys(buttons).forEach(buttonId => {
      document.getElementById(buttonId).addEventListener('click', () => {
        startCountdown(buttons[buttonId]);
      });
    });
  
    updateDateDisplay();
  });
  
  