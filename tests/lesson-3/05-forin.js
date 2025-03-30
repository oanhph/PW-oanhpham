
let student = {};
student.name = "Alex";
student.age = 10;
student.salary = 20;


// 1. In ra tên và giá trị của mỗi thuộc tính trong một đối tượng
for (let property in student) {
    console.log(`${property}: ${student[property]}`);
}


/* 2. Tính tổng các giá trị số của các thuộc tính trong một đối tượng. Ví dụ: object
student={“name”: “Alex”, “age”: 10, “salary”: 20} thì in ra tổng
30 (=10+20)
*/
let sum = 0;

for (let value in student) {
    if (typeof student[value] === "number") {
        sum += student[value];
    }
}
console.log(sum);


// 3. Tạo một mảng chứa tất cả các tên thuộc tính của một đối tượng
let arrStudent = [];

for (let getKey in student) {
    arrStudent.push(`${getKey}`);
}
console.log(arrStudent);
