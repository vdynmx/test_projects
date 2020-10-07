// JS single threaded and runs in sequence
/*
const button = document.querySelector('button');
const output = document.querySelector('p');


// eventloop demo execution order
function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    posData => {
      console.log(posData);
    },
    error => {
      console.log(error);
    }
  );
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

for (let i = 0; i < 100000; i++) {
  result += i;
}
*/

//---------- Display nested callbacks and event execution order
/*
const button = document.querySelector('button');
const output = document.querySelector('p');

function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    posData => {
      setTimeout(() => {
        console.log(posData);
      }, 2000);
    },
    error => {
      console.log(error);
    }
  );
  setTimeout(() => {
    console.log('Timer done!');
  }, 0);
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);
*/

//------------ Promises

// Nested callbacks are hard to read
/*
const button = document.querySelector('button');
const output = document.querySelector('p');

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => { // Promise takes a function as an argument. Executes when created.
    setTimeout(() => {
      resolve('Done!'); // const promise will hold the value of resolve passes, in this case DOne!
    }, duration);
  });
  return promise; //?
};

function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    posData => {
      setTimer(2000).then(promiseData => { // promiseData is the value that the promise holds in this case Done!
        console.log(promiseData, posData);
      });
    },
    error => {
      console.log(error);
    }
  );
  setTimer(1000).then(() => { // we are not using the return value here, even though value was given of Done!
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);
*/

// ------------- Promise Chaining
/*

const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = opts => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {}, // still part of getCurrentPosition
      opts
    );
  });
  return promise;
};

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  let positionData;
  getPosition()
    .then(posData => {
      positionData = posData;
      return setTimer(2000);
    })
    .then(data => {
      console.log(data, positionData);
    });
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

*/

//-------------- Promise Error Handling
/*
const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  let positionData;

  getPosition()
    .then((posData) => {
      positionData = posData;
      return setTimer(2000);
    })
    .catch((err) => { // could have multiple catch aswell. one catch after every then
      console.log(err);
      return 'on we go...';
    })
    .then((data) => {
      console.log(data, positionData);
    });
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);
*/

//------------ Async Await

//async cant only be used with functions
/*
const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = opts => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

async function trackUserHandler() { // async functions return a promise
  let positionData;
  let posData;
  let timerData;
  try { //error handling 
    posData = await getPosition(); // await is put infront of the promise, getPosition is a function that returns a promise. 
    timerData = await setTimer(2000); // this await wont run until the previous await is finished
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);
  // getPosition()
  //   .then(posData => {
  //     positionData = posData;
  //     return setTimer(2000);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return 'on we go...';
  //   })
  //   .then(data => {
  //     console.log(data, positionData);
  //   });
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

*/
// ------------ Promise All Promise Race



const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = opts => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  let positionData;
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);
  // getPosition()
  //   .then(posData => {
  //     positionData = posData;
  //     return setTimer(2000);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return 'on we go...';
  //   })
  //   .then(data => {
  //     console.log(data, positionData);
  //   });
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

// Promise.race([getPosition(), setTimer(1000)]).then(data => { // race will execture the one promise that executes faster, get API request, if it takes longer then 2 seconds abort. Race return the promise of the proimse that was fastest
//   console.log(data);
// });

// Promise.all([getPosition(), setTimer(1000)]).then(promiseData => { // all return an array with the results of all the promises
//   console.log(promiseData);
// });

Promise.allSettled([getPosition(), setTimer(1000)]).then(promiseData => { // returns an array with object of the promises and their values (promise fulfilled etc.)
  console.log(promiseData);
});

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
 