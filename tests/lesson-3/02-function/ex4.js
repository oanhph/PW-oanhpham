/* Tạo một function để cập nhật email cho người dùng trong một danh sách, dựa trên tên
người dùng.
Đoạn code giả mã (pseudo code) như sau:
// Khai báo mảng global các object có 2 thuộc tính: name, email
// Khai báo hàm có 2 tham số: name, newEmail
// Sử dụng vòng for, duyệt trong mảng, nếu gặp phần tử nào có tên
trùng với tham số name, cập nhật giá trị email về newEmail
*/

let users = [
    {
        name: "Kevin",
        email: "kevin@gmail.com"
    },
    {
        name: "Scott",
        email: "scott@gmail.com"
    },
    {
        name: "Cara",
        email: "cara@gmail.com"
    }
];

function updateEmail(name, newEmail) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            users[i].email = newEmail
            return users;
        }
    }
}
console.log(updateEmail("Cara", "new.cara@abc.com"));
