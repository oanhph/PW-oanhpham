# GIT 

## Git - merge
- Merge strategy: 
    - Fast-forward merge: 
        - Khi merge không tạo ra commit merge
        - Xảy ra khi không có thay đổi nào trên nhánh chính kể từ lúc tạo nhánh feature
    - Three way merge: 
        - Khi merge có tạo ra commit merge 
        - Xảy ra khi muốn merge feature branch vào main branch, mà lịch sử của 2 branch này đã khác nhau

## Git - conflict
- Xảy ra khi 2 người cùng sửa 1 file sau đó merge vào với nhau 

## Git - rebase 
- Command:
    ```
    git rebase main
- Cơ chế hoạt động: 
    1. Move tất cả commit từ nhánh current (main) lên đỉnh của nhánh feature A  
    2. Thực hiện merge các commit từ nhánh feature A vào nhánh main -> trở lại phiên bản fast-forward merge và merge như bình thường

## Git - squash
- Là một kiểu rebase, gộp nhiều commit lại thành một commit duy nhất
- Ưu điểm: giúp lịch sử commit ngắn gọn, dễ follow, hạn chế các commit không cần thiết
- Command: 
    ```
    git rebase -i HEAD~{soluong commit}

# POM STYLES 
## POM manager
- Quản lý nhiều page object -> Dùng cho dự án to, có nhiều page cần quản lí 
- Các page objects: 
    - Có thể được tạo và truy cập từ một nơi duy nhất -> quản lí dễ hơn 
    - Độc lập với nhau -> dễ kiểm tra, maintain 
    - Chỉ được tạo khi cần thiết -> tăng hiệu suất
- Nhược điểm: 
    - Tạo ra rất nhiều class, phải khai báo thêm nhiều class phức tạp không cần thiết. _VD: có 3 pages nhưng phải gọi tới 3 POM khác nhau để sử dụng được action của các POM đấy_
- _Ex:_
    ```
    import { test } from "@playwright/test";
    import { POMManager } from "./pom-manager";
    test("POM Manager", async ({ page}) => {
        const pomManager = new POMManager(page);
        const loginPage = pomManager.getLoginPage();
        const tagPage = pomManager.getTagPage();
        await loginPage.login("", "");
        await tagPage.navigateToTagPage();
    })

## Return POM from another POM 
- Các method của 1 page object trả về page object khác -> Áp dụng cho dự án có test case full flow, flow phải chạy qua rất nhiều page khác nhau
- Nhược điểm: Khó maintain 
- _Ex:_
    ```
    import { test } from "@playwright/test";
    import { LoginPage } from "./login-page";
    test("Return POM", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        const productPage = await loginPage.login("", "");
        const checkoutPage = await productPage.addToCart();
        const confirmPage = await checkoutPage.checkout();
        await confirmPage.getOrderInfo();
    })
