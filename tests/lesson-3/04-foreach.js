/* 1. In ra tất cả các phần tử của một mảng. Ví dụ mảng [1, 2, 3] thì in ra
1
2
3
*/
let arr1 = [];
for (let i = 1; i <= 10; i += 2) {
    arr1.push(i);
}
arr1.forEach((value) => {
    console.log(`Ex1: Elements are ${value}`);
});


/* 2. Tính tổng, tìm giá trị lớn nhất và nhỏ nhất trong một mảng. Ví dụ mảng [1, 2,
3] thì tổng sẽ là 6 (1+2+3) và giá trị lớn nhất là 3
*/
let arr2 = [];
let getSum = 0;
let getMax = arr2[0];
let getMin = arr2[0];

for (let i = 0; i <= 50; i += 5) {
    arr2.push(i);
}
console.log(`Ex2: 
    Array is [${arr2}]`);

arr2.forEach((i) => {
    getSum += i;
})

arr2.forEach((i) => {
    if (i > getMax) {
        getMax = i;
    }
    else if (i < getMin) {
        getMin = i;
    }
});

console.log(`
    Sum of array is ${getSum};
    Max value is ${getMax};
    Min value is ${getMin}`);


/* 3. Tạo một mảng mới từ một mảng đã cho, trong đó mỗi phần tử được nhân đôi. Ví
dụ mảng [1, 2, 3] thì mảng mới sẽ là [2, 4, 6]
*/
let arr3 = [10, 20, 30, 100];
let newArr3 = [];

arr3.forEach((i) => {
    newArr3.push(i * 2);
});
console.log(`Ex3: New array = [${newArr3}]`);
