# Lesson 4

## DOM (Document Object Model)

### DOM
- HTML model:
    - Mô hình hoá 1 trang web
    - Truy xuất & thao tác trên các doc có dạng như HTML, XML, Javascript, PHP... 
- Node:
    - **<option value="usa">United States</option>**: Một element
        - **<option>**: Thẻ mở 
        - **</option>**: Thẻ đóng 
        - **<img/>** || **<br>**: Thẻ tự đóng
        - **United States**: Text 
        - **value**: Thuộc tính, nằm trong thẻ mở
        - **"use"**: Giá trị của thuộc tính, nằm trong thẻ mở
    
### Thẻ HTML thường gặp
- **<div>**: Chia các khối trong trang web
- **<h1></h1> đến <h6></h6>**: Tạo ra các header phân cấp theo thứ tự từ lớn đến bé
- **<form></form>**: Chứa một form thông tin
- **input**: text, email, radio, checkbox, file, color, range, date
- **textarea**: Hiển thị ô input, dạng to
- **radio button**: Tạo nút chọn một (radio)
- **checkbox**: Tạo nút chọn nhiều lựa chọn (checkbox)
- **list** & **dropdown**: Hiển thị danh sách hoặc menu thả xuống
- **button**: Tạo nút bấm
- **table**: Hiển thị bảng dữ liệu: 
    - **thead** = table heading 
        - **tr** = table row = 1 dòng
            - **th**: table heading: text in đậm
    - **tbody**
        - **tr -> td** = table data
- **date picker**: Tạo bộ chọn ngày 
- **slider**: Tạo thanh trượt
- **iframe**: Hiển thị nội dung từ một trang web khác bên trong trang hiện tại

### Relationship 
- Quy ước: 
    - Node gốc
    - Node hiện tại
    - Node cần chú ý

- Relation: 
    - self: Node hiện tại 
    - parent: Cha 
    - children: Con
    - ancestor: Tổ tiên
    - descendant: Hậu duệ
    - sibling: Anh em - những phần tử cùng cấp và cùng cha
    - following: Theo sau - gồm các node bên tay phải của node hiện tại
    - preceding: Phía trước - gồm các node bên tay trái của node hiện tại, bao gồm cả phía trên, trừ các node trực hệ
    - following-sibling: Anh em phía sau - cùng cấp, cùng cha và ở phía phải của node hiện tại 
    - preceding-sibling: Anh em phía trước - cùng cấp, cùng cha và ở phía trái của node hiện tại 

## Selector
- Cách chọn phần tử trên page 
- Type: XPath selector, CSS selector, Playwright selector

### XPath selector
- XPath: Cú pháp tìm kiếm các elements trên  trang web bằng cách sử dụng các biểu thức XML Path
- Type: 
    - Tuyệt đối: Đi dọc theo cây DOM - bắt đầu bởi 1 **/**
    - Tương đối: Tìm dựa vài đặc tính - bắt đầu bởi 2 **/**
    - Cú pháp: **tagname[@property="value"]**
- Advance method: 
    - wildcard: Thay thế cho bất kì element nào trên XPath (kí hiệu: *)
    - chứa thuộc tính: Chọn các phần tử có chứa thuộc tính. _Ex: //*[@checked]_
    - and và or: _Ex: /div[@class='form-group' or @id='child']_
    - innerText: Chọn element dựa trên nội dung text. _Ex: //label[text()='Email ']_
    - normalize-space(): tream đầu tream cuối space. _Ex: //label[normalize-space()='Email']_
    - contains: Kiểm tra 1 chuỗi có chứa chuỗi con nào trong đó không (thường áp dụng khi kiểm tra giờ chạy). _Ex: //h1[contain(text(),'Registration')]_ 
    - starts-with: Tương tự contains nhưng required bắt đầu bởi một từ được chỉ định. _Ex: //h1[starts-with(text(),'User')]_
    - not: Sử dụng cho element không thoả mãn điều kiện trong tag. _Ex: //input[not(@id='ancestor')]_
- Axes: Dựa vào relashionship trong cây DOM để xác định XPath: **//tagrelashionship::tagname[@att='value']**
    - parent: _Ex: //tagname[@id='preceding']/parent::tagname_ 
    - child: _Ex: //tagname[@id='ancestor']/child::tagname_ hoặc _//tagname[@id='ancestor']//tagname_
    - ancestor: _Ex: ////tagname[@id='preceding']/ancestor::tagname[@id='ancestor']_ 
    - descendant
    - following
    - preceding
    - following-sibling
    - receding-sibling


## Playwright basic syntax
- **test**: Đơn vị cơ bản để khai báo một test
    ```import { test } from '@playwright/test';
    test('<test name>', async ({page})) => {
        // code
    };
- **step**: Đơn vị nhỏ hơn test, để khai báo từng step của test case 
    ```await test.step('Step name', async () => {
        // code
    });

### Basic actions
- Navigate:
    ```await page.goto('<link>');
- Click: 
    - Single click: 
        ```await page.locator("//button").click();
    - Double click: 
        ```await page.locator("//button").dblclick();
    - Click right mouse: 
        ```page.locator("//button").click({
            button: 'right'
        });
    - Click chuột kèm bấm phím khác: 
        ```page.locator("//button").click({
            modifies: ['Shift'],
        });
- Input: 
    - Fill: 
        ```page.locator("//input").fill("Playwright Viet Nam");
    - Gõ từng chữ cái vào ô input: 
        ```page.locator("//input").pressSequentially("Playwright Viet Nam", {
            delay: 100,
        });
- Radio/checkbox: 
    - Lấy giá trị hiện tại đang là check hay không:
        ```const isChecked = 
            page.locator("//input").isChecked();
    - Check/uncheck:
        ```page.locator("//input").check();
        ```page.locator("//input").setChecked(false);
    _(hàm setChecked chỉ dùng với radio)_
- Select option: **selectOption()**
- Set input file: **setInputFiles()**
