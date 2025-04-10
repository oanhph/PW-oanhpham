# JAVASCRIPT 

## Class 
- Khai báo kiểu dữ liệu
- Có inheritance 
- Ex: 
    ````
    class Student { 
        // propety
        name: string;
        city: string;
        // constructor
        constructor(name: string, city: string) {
            this.name = name; 
            this.city = city;
        }
        // method: function duoc dinh nghia ben trong class, dung de mo ta behavior cua object duoc tao ra tu class do 
        sayMyName() {
            console.log(`My name is ${this.name}`);
        }
        saySomething(message: string) {
            if (message) {
                console.log(`${this.name} says ${message}`)
            } else {
                console.log("Nothing");
            }
        }
    }
    let student1  = new Student("Van", "HN");
    student1.sayMyName();

### Class extends
- Child class, được sử dụng để kế thừa parent class 
- **super**: gọi constructor hoặc method từ parent class

## POM 
- Page Object Model: là 1 design pattern 
- Lợi ích khi sử dụng POM: 
    - Reuse code 
    - Tổ chức code gọn gàng 
    - Dễ maintain
- Không có chuẩn chung cho POM
- Core concept: 
    - Mỗi page = 1 class 
    - Có property và method riêng 
- Multiple POM: extends 
- Override property: ưu tiên lấy value của child trước 