# Lesson 2


## Git

### Git status
- Gồm 3 status: 
    - Working directory 
    - Staging area
    - Repository 

### Git - simple workflow: 
- Không dùng global config: 
*init -> config -> add -> commit -> push* 
- Dùng global config: 
*init -> add -> commit -> push* 

### Git - key takeaways
- Câu lệnh thường dùng: 
    - **git init**: Khởi tạo folder được quản lí bởi Git 
    - **git config user.name "name"**: Config name
    - **git config email.name "email@example.com"**: Config email
    - **git add "file name"**: Thêm 1 file vào staging area
    - **git add .**: Thêm toàn bộ file vào staging area
    - **git status**: Xem trạng thái file: 
        - File màu xanh: Staging area 
        - File màu đỏ: Working directoty 
    - **git commit -m "msg"**: Commit 
    - **git log**: Kiểm tra lịch sử commit 

## Javascript: 
- **node "path"**: Câu lệnh chạy file 

### Variable: 
- Dùng để lưu trữ giá trị, có thể thay đổi được
- Thường dùng **var**, **let** khi biến sẽ gán lại
- Khác nhau giữa **var** và **let**: 
    - **var**: 
        - Khai báo lại được
        - Phạm vi global 
    - **let**: 
        - Không khai báo lại được
        - Phạm vi trong cặp ngoặc {}
        - Advice: nên dùng **let** để dễ kiểm soát phạm vi của biến

### Constant:
- Dùng để khai báo các giá trị không thể thay đổi 
- Thường dùng **const** khi biến không gán lại

### Data type: 
- Gồm 8 kiểu: string, number, bigint, boolean, undefined, null, symbol, object 
    - **string**: Khai báo 1 chuỗi 
    - **number**: Khai báo 1 số 
    - **boolean**: Khai báo một giá trị kiểu đúng sai (true hoặc false)

### Comparison operator: 
- Dùng để so sánh giá trị giữa 2 biến với nhau. Kết quả sẽ trả về boolean 
- Type: 
    - So sánh hơn kém: **>**, **<**
    - So sánh bằng: **==**, **===**, **!=**, **!==**, **>=**, **<=**

### Unary operator: 
- Dùng để tăng hoặc giảm giá trị:
    - **i++** <=> i = i+1
    - **i--** <=> i = i-1 

### Arithmetic operator: 
- Dùng tính toán giá trị biểu thức: **+**, **-**, *, **/** 

### Conditional: 
- Dùng để kiểm tra có nên thực hiện một đoạn logic không 
- Cú pháp: **if (<điều kiện>) {//code}**

### Loops: 
- Dùng để thực hiện một đoạn logic với một số lần nhất định
- Cú pháp: **for (<khởi tạo>; <điều kiện dừng>; <điều kiện tăng>) {//code}** 



