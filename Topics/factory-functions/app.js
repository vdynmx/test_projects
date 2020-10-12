// Pure Function
function add(num1, num2) {
  return num1 + num2;
}

// function sendDataToServer() {}

console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27

function addRandom(num1) {
  return num1 + Math.random(); // random create a side effect of chaning value outside the function
}

console.log(addRandom(5));

let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum; // Side Effect of change a variable outside the function
  return sum;
}

console.log(addMoreNumbers(1, 5));

const hobbies = ['Sports', 'Cooking']; 

function printHobbies(h) {
  h.push('NEW HOBBY'); // side effect of changing the array outside the function
  console.log(h); // arrays are objects and objects are reference values
}

printHobbies(hobbies);


//-------------- Factory Function

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }

  return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));