# Fixture
- VD: request, page
- Init các env khác nhau cho các test 
- Isolate giữa các test
- Giúp nhóm các test dựa trên ý nghĩa thay vì common setup (VD: beforeEach, afterEach...)
- Cấu trúc 1 fixture: 
    ```
    const test = base.extend({
        todoPage: async ({ page }, use) => {
            const todoPage = new TodoPage(page);
            await todoPage.goto();
            await todoPage.addToDo('item1');
            await todoPage.addToDo('item2');
            await use(todoPage);
            await todoPage.removeAll();
        },
    });
Trước **use** - như beforeEach, sau **use** - như afterEach, **use** - chạy code trong test


# Built-in fixtures
- **page**: type = Page - Tạo 1 page riêng biệt cho test
- **context**: type = BrowserContext - Tạo 1 context riêng biệt cho test. Cùng context vs fixture page 
- **browser**: type = Browser - Được dùng chung giữa các test để tối ưu tài nguyên 
- **browserName**: type = string - Tên browser đang chạy, có thể là chromium, webkit, firefox 
- **request**: APIRequestContext - Một APIRequestContext instance độc lập, hỗ trợ test API 
Phân biệt fixture, service, utils 

# Tạo mới fixture
- Sử dụng **test.extend()** để tạo mới 1 test object 
- Sử dụng **as** để đồng bộ. VD: _test as base_
    ```
    import { test as base } from '@playwright/test'
    const test = base.extend<{ page2: Page2 }>({
        page2: async ({ }, use) => {
        const page2 = new Page2();
        page2.sayMyName();
        await use(page2);
        console.log("after page2");
        }
    })
    export { test };
- Nếu cùng có beforeAll, afterAll, beforeEach, afterEach, fixture thì thứ tự chạy code như sau: beforeAll > beforeEach > beforeFixture > code test > afterEach > afterFixture > afterAll 
- Cách tổ chức fixture (merge fixture)
    ```
    import { mergeTests } from "@playwright/test";
    import { test as t1 } from './fixture-1';
    import { test as t2 } from './fixture-2';

    export const test = mergeTests(t1, t2);

# Managing environment variables 
- Cài đặt lib **dotenv**
    ```
    npm install dotenv --save
- Trong file playwright.config.ts thêm: 
    ```
    import { config } from 'dotenv';
    config();
- Cách lấy value trong file .env: 
    ```
    process.env.ENV 
