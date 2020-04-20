const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
const randomNumber2 = Math.random();
console.log(randomNumber);
console.log(randomNumber2);

if ( randomNumber > 0.7) {
    alert('Number is greater then 0.7');
} else {
    
}

const array = [2,4,6,8,10];

for ( i = array.length; i >= 0; i-- ) {
    console.log(array[i]);
}


for (element in array) {
    console.log(array[element]);
}

if ( (randomNumber > 0.7 && randomNumber2 > 0.7 ) || (randomNumber < 0.2 || randomNumber2 < 0.2) ) {
    alert('both numbers are above 0.7 OR one is smaller then 0.2');
}