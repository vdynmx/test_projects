// Pure functions always produce the same results 

function add(num1, num2) {
  return num1 + num2;
}

// function sendDataToServer() {}

console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27

// Not pure function since the random function makes the output unpredictable
function addRandom(num1) {
  return num1 + Math.random();
}

//Side Effetcs change things outside of function itself

console.log(addRandom(5));

let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum; // we introduce a side effect here because we set a value to a varible define outside the function itself
  return sum;
}

console.log(addMoreNumbers(1, 5));

const hobbies = ['Sports', 'Cooking'];

function printHobbies(h) {
  h.push('NEW HOBBY');
  console.log(h);
}

// We change the array, arrays are objects and objects are reference values. We changed the original array

printHobbies(hobbies);

//------------ Factory Function

let multiplier = 1.1;

function createTaxCalculator(tax) { 
  function calculateTax(amount) { // due to scope tax is available from the outer function
    console.log(multiplier);
    return amount * tax * multiplier;
  }

  return calculateTax;
}// Closure -> each function closes over its surrounding envviorment and memorized variables.
// each function has its own lexical enviorment (function scope)
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

// multiplier = 1.2;

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));

//--------- Closure

let userName = 'Max';

function greetUser() {
  // let name = 'Anna'; // Only when the function dosent find a variable inside the function will it look upward to find 
  // let name = userName;
  console.log('Hi ' + name); // locks in the variable itself on first run
}

let name = 'Maximilian';

userName = 'Manuel';

greetUser();

//----- Recursion

// function powerOf(x, n) {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x; // result = result * x;
//   }

//   return result;
// }

// Point of recursion is that the function calls itself

function powerOf(x, n) {

  // if (n === 1) {
  //   return x;  // base case, have to have an end condition
  // }
  // return x * powerOf(x, n - 1); // we increment one down each time it runs

  return n === 1 ? x : x * powerOf(x, n - 1); // Turnary expression
}

console.log(powerOf(2, 3)); // 2 * 2 * 2

//---- Advanced Rescursion

const myself = {
  name: 'Max',
  friends: [
    {
      name: 'Manuel',
      friends: [
        {
          name: 'Chris',
          friends: [
            {
              name: 'Hari'
            },
            {
              name: 'Amilia'
            }
          ]
        }
      ]
    },
    {
      name: 'Julia'
    }
  ]
};

// difficult to cycle through unknown tree structure for example. Hierarchical loop nightmare


function getFriendNames(person) {
  const collectedNames = [];

  if (!person.friends) { // If object that is being cycled through dosent have friends, hence falsy.
    return []; // undefined or empty and we return empty array.
  }
  
  for (const friend of person.friends) { // go through all friends of the person friends. Cycling throuhg the friends property of the object
    collectedNames.push(friend.name); // add the friend to the collectedNames; This step would be okay for just 1 level.
    collectedNames.push(...getFriendNames(friend)); // Recursion; the spread opperator avoid nesting of multiple arrays due to hierachy
  }
  
  return collectedNames;
}

console.log(getFriendNames(myself));