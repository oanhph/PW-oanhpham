const height = 115;

let idealWeight = (height % 100) * 9 / 10;
let maxWeight = (height % 100);
let minWeight = (height % 100) * 8 / 10;

console.log(
    "Cân nặng lý tưởng:", idealWeight,
    "Cân nặng tối đa", maxWeight,
    "Cân nặng tối thiểu", minWeight
);