'use strict';

// *************** GLOBALS
// *************** DOM WINDOWS
// ****************** CANVAS ELEMENT FOR CHART ************
// **************** CONSTRUCTOR FUNCTION
// ***************** HELPER FUNCTIONS UTILITIES
// *********** HELPER FUNCTION TO RENDER CHART ************
// **************** EVENT HANDLERS ***********
// **************** EXECUTABLE CODE
//=========================================================

// *************** GLOBALS
let alienArray = [];
let votingRounds = 25;

// *************** DOM WINDOWS
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');

// ****************** CANVAS ELEMENT FOR CHART ************
let ctx = document.getElementById('alien-chart');

// **************** CONSTRUCTOR FUNCTION
function Alien(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

// ***************** HELPER FUNCTIONS UTILITIES

let indexArray = [];

function renderImg() {

  while (indexArray.length < 6) {
    let randoNum = randomIndex();
    if (!indexArray.includes(randoNum)) {
      indexArray.push(randoNum);
    }
  }

  console.log(indexArray);

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = alienArray[imgOneIndex].image;
  imgOne.title = alienArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${alienArray[imgOneIndex].name}`;
  alienArray[imgOneIndex].views = alienArray[imgOneIndex].views + 1;

  imgTwo.src = alienArray[imgTwoIndex].image;
  imgTwo.title = alienArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${alienArray[imgTwoIndex].name}`;
  alienArray[imgTwoIndex].views = alienArray[imgTwoIndex].views + 1;

  imgThree.src = alienArray[imgThreeIndex].image;
  imgThree.title = alienArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${alienArray[imgThreeIndex].name}`;
  alienArray[imgThreeIndex].views = alienArray[imgThreeIndex].views + 1;

}

function randomIndex() {
  return Math.floor(Math.random() * alienArray.length);
}

// *********** HELPER FUNCTION TO RENDER CHART **************

function renderChart() {

  let alienNames = [];
  let alienVotes = [];
  let alienViews = [];

  for (let i = 0; i < alienArray.length; i++) {
    alienNames.push(alienArray[i].name);
    alienVotes.push(alienArray[i].votes);
    alienViews.push(alienArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: alienNames,
      datasets: [{
        label: '# Of Votes',
        data: alienVotes,
        borderWidth: 5,
        backgroundColor: ['lightgreen'],
        borderColor: ['lightgreen']
      },
      {
        label: '# of Views',
        data: alienViews,
        borderWidth: 5,
        backgroundColor: ['green'],
        borderColor: ['green']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  };


  new Chart(ctx, chartObj); ///eslint-disable-line
}

// **************** EVENT HANDLERS ***********

function handleImgClick(event) {
  let imgClicked = event.target.title;
  console.log(imgClicked);

  for (let i = 0; i < alienArray.length; i++) {
    if (imgClicked === alienArray[i].name) {
      alienArray[i].votes++;

      votingRounds--;

      renderImg();

    }
  }



  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);

    // document.getElementById('show-results-btn').style=visibility:'visible';
    //************************** LOCAL STORAGE STARTS HERE
    // STEP 1 - CONVERT DATA TO STRING TO STORE IN LOCAL STORAGE
    let stringifiedAliens = JSON.stringify(alienArray);
    

    // STEP 2 - SET STRINGIFIED ALIENS INTO LOCAL STORAGE
    localStorage.setItem('myAliens', stringifiedAliens);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    renderChart();

    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// **************** EXECUTABLE CODE

// ***************LOCAL STORAGE CONTINUES......

// STEP 3 - GET INFO FROM LOCAL STORAGE
let retrievedAliens = localStorage.getItem('myAliens');

// STEP 4 - CONVERT BACK TO USABLE CODE
let parsedAliens = JSON.parse(retrievedAliens);

// **************** REBUILD ALIEN USING THE CONTRUCTOR

if (retrievedAliens) {
  for (let i = 0; i < parsedAliens.length; i++) {
    if (parsedAliens[i].name === 'bag') {
      let reconstructedBagAliens = new Alien(parsedAliens[i].name, 'png');
      reconstructedBagAliens.views = parsedAliens[i].views;
      reconstructedBagAliens.votes = parsedAliens[i].votes;
      alienArray.push(reconstructedBagAliens);
    } else {
      let reconstructedAliens = new Alien(parsedAliens[i].name);
      reconstructedAliens.views = parsedAliens[i].views;
      reconstructedAliens.votes = parsedAliens[i].votes;
      alienArray.push(reconstructedAliens);
    }
  }

} else {

  let bag = new Alien('bag', 'png');
  let banana = new Alien('banana');
  let bathroom = new Alien('bathroom');
  let boots = new Alien('boots');
  let breakfast = new Alien('breakfast');
  let bubblegum = new Alien('bubblegum');
  let chair = new Alien('chair');
  let cthulhu = new Alien('cthulhu');
  let dogDuck = new Alien('dogDuck');
  let dragon = new Alien('dragon');
  let pen = new Alien('pen');
  let petSweep = new Alien('petSweep');
  let scissors = new Alien('scissors');
  let shark = new Alien('shark');
  let sweep = new Alien('sweep');
  let tauntaun = new Alien('tauntaun');
  let unicorn = new Alien('unicorn');
  let waterCan = new Alien('waterCan');
  let wineGlass = new Alien('wineGlass');

  alienArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}

console.log('ref1', alienArray);

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);


