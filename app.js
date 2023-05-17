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

let ctx = document.getElementById('my-chart');

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

let indexArray = [];    

function renderImgs() {
    while(indexArray.length < 6){
        let randomNumber = randomIndexGenerator();
        if(!indexArray.includes(randomNumber)){
            indexArray.push(randomNumber);
        }
    }

    let imgOneIndex = indexArray.shift();
    let imgTwoIndex = indexArray.shift();
    let imgThreeIndex = indexArray.shift();

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

function renderChart() {
    let productNames = [];
    let productViews = [];
    let productVotes = [];

    for (let i = 0; i < productArray.length; i++) {
        productNames.push(productArray[i].name);
        productViews.push(productArray[i].views);
        productVotes.push(productArray[i].votes);
    }

    let chartObj = {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: '# of Views',
                data: productViews,
                borderWidth: 2,
                backgroundColor: 'red',
                borderColor: 'black'
            },
            {
                label: '# of Votes',
                data: productVotes,
                borderWidth: 2,
                backgroundColor: 'blue',
                borderColor: 'black'
            },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, chartObj);
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

    if (votingRounds === 0) {
        imgContainer.removeEventListener('click', handleImgClick);

// ***** LOCAL STORAGE *****

        let stringifedProducts = JSON.stringify(productArray);

        localStorage.setItem('myProducts', stringifedProducts)
    }
}


function handleShowResults() {
    if (votingRounds === 0) {
        renderChart();
    }
    resultBtn.removeEventListener('click', handleShowResults);
}


// ***** EXECUTABLE CODE *****

// ***** LOCAL STORAGE CONT. *****

let retrievedProducts = localStorage.getItem('myProducts');

let parsedProducts = JSON.parse(retrievedProducts);

// ***** HAPPY PATH *****

if(retrievedProducts){
    productArray = parsedProducts;
}   else{

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
}

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
