const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "colorMode";
DEFAULT_COLOR = 'black';
const colorBtn = document.querySelector('.colorBtn');
const gridContainer = document.getElementById('grid-container');
const clearButton = document.querySelector('.clearBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraser = document.querySelector('.eraserBtn');
const buttons = Array.from(document.querySelectorAll('button'));
const gridSizeSlider = document.getElementById('gridSizeSlider');
const sizeValue = document.querySelector('.sizeValue');
const colorPicker = document.querySelector('#colorPicker');
let isPainting=false;
let size =  DEFAULT_SIZE;
let colorValue = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

colorBtn.classList.add('colored-button');

colorPicker.addEventListener('input', function() {
    colorValue = this.value;
});

gridSizeSlider.addEventListener('input', function() {
    size = this.value;
    setupGrid(size, gridContainer);
    sizeValue.textContent = `${size} X ${size}`;
});


const colors = [
    '#9400D3', // Violet
    '#4B0082', // Indigo
    '#0000FF', // Blue
    '#008000', // Green
    '#FFFF00', // Yellow
    '#FFA500', // Orange
    '#FF0000'  // Red
  ];
  

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }


changeColor = function(e){
    if (currentMode=="colorMode" && isPainting==true){
        e.target.style.backgroundColor = colorValue;
    }else if(currentMode=="eraseMode" && isPainting==true){
        e.target.style.backgroundColor = 'white';
    }else if(currentMode=="rainbowMode" && isPainting==true){
        e.target.style.backgroundColor = getRandomColor();
    }
}

function setupGrid(size, gridContainer) {
    gridContainer.innerHTML = '';

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('mousedown', () => {isPainting=true;});
        cell.addEventListener('mousemove', changeColor);
        cell.addEventListener('mouseup', () => {isPainting=false;});
        gridContainer.appendChild(cell);
    }
    return gridContainer
}


function erase(e){
    currentMode='eraseMode';
    buttons.forEach(button =>  { if( Array.from(button.classList).includes('colored-button')){
        button.classList.remove('colored-button');
    }});
    e.target.classList.add('colored-button');
}

function randomizeColor(e){
    currentMode='rainbowMode';
    buttons.forEach(button =>  { if( Array.from(button.classList).includes('colored-button')){
        button.classList.remove('colored-button');
    }});
    e.target.classList.add('colored-button');
}

colorBtn.addEventListener('click', (e) => {
    currentMode="colorMode";
    buttons.forEach(button =>  { if( Array.from(button.classList).includes('colored-button')){
        button.classList.remove('colored-button');
    }});
    e.target.classList.add('colored-button');
});


eraser.addEventListener('click', erase);
rainbowBtn.addEventListener('click', randomizeColor);
clearButton.addEventListener('click', () => setupGrid(size, gridContainer));


setupGrid(size, gridContainer);




