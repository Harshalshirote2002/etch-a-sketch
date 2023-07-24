const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "colorMode";
const colorBtn = document.querySelector('.colorBtn');
const gridContainer = document.getElementById('grid-container');
const clearButton = document.querySelector('.clearBtn');
const eraser = document.querySelector('.eraserBtn');
const buttons = Array.from(document.querySelectorAll('button'));
const gridSizeSlider = document.getElementById('gridSizeSlider');
const sizeValue = document.querySelector('.sizeValue');


gridSizeSlider.addEventListener('input', function() {
    const gridSize = this.value;
    setupGrid(gridSize);
    sizeValue.textContent = `${gridSize} x ${gridSize}`;
});


currentMode = DEFAULT_MODE;

function changeColor(e){
    if (currentMode=="colorMode"){
        e.target.classList.add('colored-grid');
    }else if(currentMode=="eraseMode"){
        if(Array.from(e.target.classList).includes("colored-grid")) e.target.classList.remove('colored-grid');
    }
}

function setupGrid(size, mode) {
    gridContainer.innerHTML = '';

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Create cells and append them to the grid container
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('mousedown', changeColor);
        cell.addEventListener('mousemove', changeColor);
        gridContainer.appendChild(cell);
    }
    if(mode == "colorMode"){ 
        colorBtn.classList.add('colored-button');
    }
}


function erase(e){
    currentMode='eraseMode';
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



setupGrid(DEFAULT_SIZE, DEFAULT_MODE);

clearButton.addEventListener('click', () => setupGrid(DEFAULT_SIZE, "someOther"));