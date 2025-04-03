// 1. Tính tổng từ 1 đến 100.

function calculateSum() {
    let sum = 0;
    for (let i = 0; i <= 100; i++) {
        sum += i;
    }
    return sum;
}
console.log(`Sum from 1 to 100: ${calculateSum()}`);


// 2. In bảng cửu chương từ 2 đến 9

for (let i = 2; i <= 9; i++) {
    console.log(`Multiplication table: ${i}`);
    for (let num = 1; num <= 10; num++) {
        console.log(`${i} x ${num} = ${i * num}`);
    }
};


// 3. Tạo một mảng chứa các số lẻ từ 1 đến 99.

let arr = [];
for (let i = 1; i <= 99; i += 2) {
    arr.push(i);
}
console.log(arr);


/* 4. Tính tổng doanh thu của 12 tháng trong năm dựa trên mảng doanh thu đã cho và
in ra tổng doanh thu. Biết cấu trúc object của mảng doanh thu như sau:
{“month”: 2, “total”: 100}
*/

let revenue = [];
for (let i = 1; i <= 12; i++) {
    revenue.push({ month: i });
    for (let a = 0; a < revenue.length; a++) {
        revenue[a].total = 100;
    }
}

let totalRevenue = 0;
for (let b = 0; b < revenue.length; b++) {
    totalRevenue += revenue[b].total;
}
console.log(`Revenue in 12 months: ${totalRevenue}`);
