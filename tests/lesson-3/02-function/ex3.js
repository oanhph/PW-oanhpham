/* 3. Viết một hàm để lọc ra các số nguyên tố từ một mảng số đã cho.
Biết:
○ Số 0, số 1 không phải số nguyên tố.
○ Các số nguyên tố là số chỉ chia hết cho 1 và chính nó
*/

let number = [0, 1, 5, 3, 4, 7, 8, 10, 15, 2];
let result = [];

function filterPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 2; i <= num / 2; i++) {
        if (num % i === 0) return false;
    }
    return true;
};
number.forEach(num => {
    if (filterPrime(num)) {
        result[result.length] = num;
    }
});
console.log(result);

