// 1. Tạo mảng chứa các kí tự nghịch đảo từ một chuỗi đã cho
let arrStr = "Playwright";
let inversion = [];

for (let i = arrStr.length - 1; i >= 0; i--) {
    inversion.push(arrStr[i]);
}
console.log(inversion);

// 2. Lọc ra tất cả các phần tử duy nhất trong một mảng
// let arrNumber = [1, 2, 3, 1, 2, 4, 5];
// let unique = [];

for (let num of arrNumber) {
    if (arrNumber.indexOf(num) === arrNumber.lastIndexOf(num)) {
        unique.push(num);
    }
}
console.log(unique);
