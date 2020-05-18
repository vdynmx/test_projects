const numbers = [1,2,3,4,5,6,7,8,9];

const numbsG5 = numbers.filter((val) => {return val > 5;});

console.log(numbsG5);
//const sorted = numbers.sort((1,5) => numbers;)

const mapNum = numbers.map(val => ({num: val}));
console.log(mapNum);

const sumnum = numbers.reduce((sumVal, curVal) => sumVal * curVal, 1);
console.log(sumnum);

function findMax(...nums) {
    let curMax = nums[0];
    for (const num of nums) {
        if (num > curMax) {
            curMax = num;
        }
    }
    return curMax;
} 

console.log(findMax(...numbers));

function findMinMax(...nums) {
    let curMax = nums[0];
    let curMin = nums[0];
    for (const num of nums) {
        if (num > curMax) {
            curMax = num;
        }
        else if (num < curMin) {
            curMin = num;
        }
    }
    return [curMin, curMax];
} 

const [min, max] = findMinMax(...numbers);

console.log(findMinMax(...numbers));
console.log(min, max);

const userIds = new Set();
userIds.add(10);
userIds.add(-5);
userIds.add(-5);
console.log(userIds);