const numbers = [1,3,5,7,9,11];

let getArrayFirstValue = numbers[0];
let getArraySecondValue = numbers[1];
console.log(getArrayFirstValue,getArraySecondValue);

const [
    arrayFirstElement,
    arraySecondElement,
    arrayThirdElement,
    arrayFourthElemt,
] = numbers;

console.log(
     arrayFirstElement,
    arraySecondElement,
    arrayThirdElement,
    arrayFourthElemt,
);