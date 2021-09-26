const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const xTime = 100;


startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        if (event.target.getAttribute('data-time')) {
        time = parseInt(event.target.getAttribute('data-time'));
        } else {
            time = Math.round(Math.random() * xTime);
            if (time < 10) time = 10;
        }
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime (value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame(){
    timeEl.parentNode.classList.add('hide');
    // timeEl.parentNode.remove();
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
    board.innerHTML += `<a href="#" class="start" id="restart">Попробовать ещё раз?</a>`;
    const restart = document.querySelector('#restart');
    restart.addEventListener('click', () => {
        location.reload();
    })
    
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const color = getRandomColor();

    // деструкторизация!!!! полезная вещь!
    const {width, height} = board.getBoundingClientRect();
    
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    board.append(circle);
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function getRandomColor () {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgb(${r},${g},${b})`;
    return color;
}