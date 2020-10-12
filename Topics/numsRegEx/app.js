// Floating Point are ImPrecise as ther is no 0.2. its really 0.200000000001 , where you can never really reach a whole number with float or fractions
// 20.2.toFixed(20) ; fix could be to only work with integers 20.2 * 100
// 
// BigInt, working with large numbers, appending n 9007121061968491n
// Number & Math object have special methods


// create a random number between 1 and 10
function randomIntBetween(min, max) {
  // min: 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min); // 10.999999999999 => 10, floor rounds down to the closest integer
}

//console.log(randomIntBetween(1, 10));

// methods on strings available.
// Template Literals; Tagged Templates

function productDescription(strings, productName, productPrice) {
  console.log(strings); // strings outputs an arrary of the string passed into the function.
  console.log(productName);
  console.log(productPrice);
  let priceCategory = 'pretty cheap regarding its price';
  if (productPrice > 20) {
    priceCategory = 'fairly priced';
  }
  return `${strings[0]}${productName}${strings[1]}${priceCategory}${ //modifying the string with tagged template
    strings[2]
  }`;
  return {name: productName, price: productPrice}; // not forced to return the string in a tagged template
}

const prodName = 'JavaScript Course';
const prodPrice = 19.99;

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;// Template literal right after function name``
console.log(productOutput);


//---------------- Regular Expressions RegEx

const regex = /hello/ //checking if hallo is part in there
const regex2 = /(h|H)ello/ // checking for upper or lover case H and ello
const regex3 = /.ello/ // wildcard first character
const emailRegex = /^\S+@\S+\./ //email verification
// emailRegex.test(userInput) boolean return
// regex usually researched not learned 

