/* 3. Viết một hàm để lọc ra các số nguyên tố từ một mảng số đã cho.
Biết:
○ Số 0, số 1 không phải số nguyên tố.
○ Các số nguyên tố là số chỉ chia hết cho 1 và chính nó
*/

let number = [1, 5, 3, 4, 7, 8, 10];
let result = [];

function isPrime(num) {
    if (num < 2) return false; 
    if (num === 2 || num === 3) return true; 
    if (num % 2 === 0) return false; 

    for (let i = 3; i <= num / 2; i += 2) { 
        if (num % i === 0) return false;
    }
    return true;
};
number.forEach(num => {
    if (isPrime(num)) { 
        result[result.length] = num;
    }
});
console.log(result);

