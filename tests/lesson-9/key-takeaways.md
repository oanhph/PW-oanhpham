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
Phân biệt fixture, service, ultis 

# Tạo mới fixture