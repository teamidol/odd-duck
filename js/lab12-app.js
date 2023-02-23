'use strict';



// *************** GLOBALS
let alienArray = [];
let votingRounds = 25;

// *************** DOM WINDOWS
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');
// let resultsList = document.getElementById('results-list');

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

  // let imgOneIndex = randomIndex();
  // let imgTwoIndex = randomIndex();
  // let imgThreeIndex = randomIndex();

  // while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
  //   imgTwoIndex = randomIndex();
  //   imgThreeIndex = randomIndex();
  // }

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
    }
  }

  votingRounds--;

  renderImg();

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);

    //document.getElementById('show-results-btn').style=visibility:visible';
  }
}
function handleShowResults() {
  if (votingRounds === 0) {
    //==================== (lab11, start)
    // for (let i = 0; i < alienArray.length; i++) {
    //   let alienListItem = document.createElement('li');
    //   alienListItem.textContent = `${alienArray[i].name}: View: ${alienArray[i].views} & Votes: ${alienArray[i].votes}`;
    //   resultsList.appendChild(alienListItem);
    // }
    //====================== (lab11, end)
    renderChart();

    resultsBtn.removeEventListener('click', handleShowResults);
  }
}


// **************** EXECUTABLE CODE

let bag = new Alien('bag');
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

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);
