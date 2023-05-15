'use strict';

// ***** GLOBALS *****

let votingRounds = 25;
let productArray = [];


// ***** DOM WINDOWS *****

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultList = document.getElementById('results-container');

// ***** CONSTRUCTOR FUNCTION *****

function Product(name, imageExtension = 'jpg') {
    this.name = name;
    this.image = `img/${name}.${imageExtension}`;
    this.votes = 0;
    this.views = 0;
}

// ***** HELPER FUNCTIONS / UTILITES *****

function randomIndexGenerator() {
    return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {
    let imgOneIndex = randomIndexGenerator();
    let imgTwoIndex = randomIndexGenerator();
    let imgThreeIndex = randomIndexGenerator();

    while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
        imgTwoIndex = randomIndexGenerator();
        imgThreeIndex = randomIndexGenerator();
    }

    imgOne.src = productArray[imgOneIndex].image
    imgOne.title = productArray[imgOneIndex].name

    imgTwo.src = productArray[imgTwoIndex].image
    imgTwo.title = productArray[imgTwoIndex].name

    imgThree.src = productArray[imgThreeIndex].image
    imgThree.title = productArray[imgThreeIndex].name

    productArray[imgOneIndex].views++
    productArray[imgTwoIndex].views++
    productArray[imgThreeIndex].views++
}

// ***** EVENT HANDLER *****

function handleImgClick(event) {
    let imageClicked = event.target.title;
    for (let i = 0; i < productArray.length; i++) {
        if (imageClicked === productArray[i].name) {
            productArray[i].votes++;
            votingRounds--;
            renderImgs();
        }
    }
    if (votingRounds === 0){
        imgContainer.removeEventListener('click', handleImgClick);
    }
}


function handleShowResults() {
    if (votingRounds === 0) {
        for (let i = 0; i < productArray.length; i++) {
            let productListItem = document.createElement('li');
            productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

            resultList.appendChild(productListItem);
        }
        resultBtn.removeEventListener('click', handleShowResults);
    }
}


// ***** EXECUTABLE CODE *****

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');


productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);