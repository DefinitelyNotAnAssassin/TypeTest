

let timerInterval;

const StartTimer = () => {
    const timer = document.getElementById("timer");
    let time = 0;

    const updateTimer = () => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        timer.innerHTML = `${minutes}:${seconds}`;
    };

    timerInterval = setInterval(() => {
        time++;
        updateTimer();
    }, 1000);

    updateTimer(); // Initial call to set the timer to 00:00
    return timerInterval;
};

const StopTimer = () => {
    clearInterval(timerInterval);

    return document.getElementById("timer").innerHTML;

};


export { StartTimer, StopTimer }