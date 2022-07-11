'use strict';

//Elementos de mi HTML
const inputNumber = document.querySelector('.js_input');
const btn = document.querySelector('.js_button');
const resetButon = document.querySelector('.js_reset');
const clue = document.querySelector('.js_clue');
const changeColor = document.querySelector('.js_changecolor');
const main = document.querySelector('.js_main');
const attempts = document.querySelector('.js_attempts');


let attemptsValue = 0;

//Número Random
let randomNumber = getRandomNumber(100);

function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
};

console.log(randomNumber);

//Comprobación del número introducido
const writeTip = message => clue.innerHTML = message;

function isNumber () {
    const inputValue = parseInt(inputNumber.value);
    if (isNaN(inputValue) || inputValue === ''){
        writeTip("Introduce un número");
    } else {
        compareNumber();
    }
}


//Comparación del número introducido
function changeColorBigger (){
    changeColor.classList.remove('smaller', 'error');
    changeColor.classList.add('bigger');
}

function changeColorSmaller (){
    changeColor.classList.remove('bigger', 'error');
    changeColor.classList.add('smaller');
}

function changeColorError (){
    changeColor.classList.remove('bigger', 'smaller');
    changeColor.classList.add('error');
}

const winner = () => main.classList.add('winner');

const compareNumber = () => {
    const inputValue = parseInt(inputNumber.value);
    if(inputValue > 100 || inputValue < 1){
       writeTip("El número debe estar entre 1 y 100.");
       changeColorError();
    }
    else if(inputValue > randomNumber){
        writeTip("Demasiado alto.");
        changeColorBigger();
    } else if(inputValue < randomNumber){
        writeTip("Demasiado bajo.");
        changeColorSmaller();
    } else {
        writeTip("¡¡¡Has ganado campeon@!!!");
        winner();
        alert('¡¡¡Enhorabuena!!! ¡¡¡Has ganado campeon@!!!')
    }
};

//Contador de intentos
function attemptsCount() {
    attemptsValue = ++attemptsValue;
    attempts.innerHTML = attemptsValue;
}


//Función manejadora del evento
function handleClick(e) {
    e.preventDefault();
    isNumber();
    attemptsCount();
};

function handleEnter (event) {
    if(event.code === 'Enter'){
        handleClick();
    }
}

//Eventos
btn.addEventListener('click', handleClick);
btn.addEventListener('keyup', handleEnter);


//Botón Volver a jugar
const cleanCount = () => {
    attemptsValue = '0';
    attempts.innerHTML = attemptsValue;
}

const cleanClue = () => writeTip('Escribe el número y dale a prueba');

const cleanChangeColor = () => changeColor.classList.remove('bigger', 'smaller', 'error');

const removeWinner = () => main.classList.remove('winner');

function handlerReset(){
    inputNumber.value = '';
    cleanClue();
    cleanCount();
    cleanChangeColor();
    removeWinner();
    randomNumber = getRandomNumber(100);
    console.log(randomNumber);
};


//Evento volver a jugar
resetButon.addEventListener('click', handlerReset);