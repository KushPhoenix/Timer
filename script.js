const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const editBtn = document.getElementById('editBtn');

const timerText_H = document.getElementById('timerText_H');
const timerText_M = document.getElementById('timerText_M');
const timerText_S = document.getElementById('timerText_S');

const countdownBar = document.getElementById('countdownBar');
const countdownBar2 = document.getElementById('countdownBar2');

const countdownInput = document.getElementById('countdownInput');

let time = 0;
let timerInterval;
let isPaused = false;


playPauseBtn.addEventListener('click', () => {
  togglePlayPause();
});

function togglePlayPause() {
  if (timerInterval) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  const inputTime = parseInt(countdownInput.value, 10);
  if (!isNaN(inputTime) && inputTime > 0) {
    time = inputTime;
    updateTimerDisplay();
    resetCountdownBar();
    if (!timerInterval) {
      timerInterval = setInterval(updateTimer, 1000);
    }
    disableEditButton(true);
    // playPauseBtn.textContent = '';
  } else {
    alert('Please enter a valid countdown time in seconds.');
  }
}

function pauseTimer() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(timerInterval);
    timerInterval = null;
    // playPauseBtn.textContent = 'Play';
    enableEditButton();
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    // playPauseBtn.textContent = 'Pause';
    disableEditButton(true);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 0;
  updateTimerDisplay();
  resetCountdownBar();
//   playPauseBtn.textContent = 'Play';
  isPaused = false;
  enableEditButton();
}



// function updateTimer() {
//     if (isPaused) {
//         return; // If the timer is paused, do nothing
//     } 
//     time--;
//     if (time < 0) {
//         clearInterval(timerInterval);
//         timerInterval = null;
//         time = 0;
//         // Handle timer completion here if needed
//         enableEditButton();
//     }
//     updateTimerDisplay();
//     updateCountdownBar();
// }

function updateTimer() {
    if (isPaused) {
      return; // If the timer is paused, do nothing
    } 
    time--;
    if (time < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      time = 0;
      // Handle timer completion here if needed
      enableEditButton();
    }
    updateTimerDisplay();
    updateCountdownBar();
  }

function updateTimerDisplay() {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

    const formattedTime_H = `${padZero(hours)}`;
    timerText_H.textContent = formattedTime_H;

    const formattedTime_M = `${padZero(minutes)}`;
    timerText_M.textContent = formattedTime_M;

    const formattedTime_S = `${padZero(seconds)}`;
    timerText_S.textContent = formattedTime_S;

}

function updateCountdownBar() {
  const totalSeconds = parseInt(countdownInput.value, 10);
  const percentageElapsed = ((totalSeconds - time) / totalSeconds) * 100;

  if (percentageElapsed >= 90) {
    countdownBar.style.backgroundColor = '#B80000'; // Default color
  } else if (percentageElapsed >= 60) {
    countdownBar.style.backgroundColor = '#FFC436'; // Change to the color you want
  } else {
    countdownBar.style.backgroundColor = '#0f8feb'; // Default color
  }

  if (percentageElapsed >= 90) {
    countdownBar2.style.backgroundColor = '#B80000'; // Default color
  } else if (percentageElapsed >= 60) {
    countdownBar2.style.backgroundColor = '#FFC436'; // Change to the color you want
  } else {
    countdownBar2.style.backgroundColor = '#0f8feb'; // Default color
  }

  const barWidth = Math.max(100 - percentageElapsed, 0) + '%';
  countdownBar.style.width = barWidth;

  const barWidth2 = Math.max(100 - percentageElapsed, 0) + '%';
  countdownBar2.style.width = barWidth2;
}


function resetCountdownBar() {
  countdownBar.style.width = '100%';
  countdownBar2.style.width = '100%';
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}


function editTime() {
    if (!timerInterval) {
      const newTime = prompt('Enter new time in seconds:');
      if (newTime !== null && !isNaN(newTime) && newTime > 0) {
        time = parseInt(newTime, 10); // Convert newTime to an integer
        countdownInput.value = time;
        updateTimerDisplay();
        resetCountdownBar();
      } else {
        alert('Please enter a valid time.');
      }
    }
  }

function disableEditButton(disable) {
  editBtn.disabled = disable;
}

function enableEditButton() {
  editBtn.disabled = false;
}
