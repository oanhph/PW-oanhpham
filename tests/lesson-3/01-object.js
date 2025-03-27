/* Tạo một object student và truy cập đến điểm môn toán (math) sử dụng ngoặc vuông.
Biết object student bao gồm 2 thuộc tính: name và grades. Trong đó grades là một
object với 2 thuộc tính kiểu number: math và english
*/
let student = {
    name: "",
    grades: {
        math: 3,
        english: 8
    }
};
console.log(student.grades["math"]);

/* Tạo một object product với các thuộc tính là tên các sản phẩm và giá trị là giá
của chúng. Dùng vòng lặp for...in để in ra tên và giá của mỗi sản phẩm.
*/
let product = {
    headphone: 2000000,
    mouse: 1200000,
    keyboard: 2500000,
    webCam: 800000
};
for (let item in product) {
    console.log(item);
    console.log(product[item]);
};

/* Tạo một object bike và sau đó thêm thuộc tính color vào object đó
*/
let bike = {
    brand: "Tesla",
    model: "TL-B1"
};
bike.color = "green";
console.log(bike);

/* Tạo một object employee với các thuộc tính: name, age và xóa thuộc tính age khỏi
object này
*/
let employee = {
    name: "Elon Musk",
    age: 20
};
delete employee.age;
console.log(employee);

/* Một trường học có các lớp học và học sinh như sau:
○ classA: An, Bình, Châu
○ classB: Đào, Hương, Giang
Hãy viết code để đáp ứng yêu cầu sau:
- Khai báo tên biến: school
- Tên class là tên thuộc tính, giá trị của các thuộc tính này là một mảng chứa
tên các học sinh
*/
let school = {
    classA: ["An", "Bình", "Châu"],
    classB: ["Đào", "Hương", "Giang"]
};
console.log(school);