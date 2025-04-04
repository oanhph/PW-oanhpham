# GIT

## Clone
- Remote -> local
- Run command 1 lần đầu tiên, clone cả repo về 
- Command: 
    - git clone <url> <project name>
    - git clone <url> <new name>

## Push
- Repo -> server
- Command: 
    - git push <remote_name> <branch_name>
    - git push origin main 

## Pull 
- Remote -> local
- Run command trước mỗi lần start code, chỉ lấy dữ liệu của nhánh đó về local 
- Command: 
    - git pull origin main 
    - git pull origin <branch_nam>
    - git pull <remote_name> <branhc_name>

## Merge request

## Reviewer

## Convention 


# PLAYWRIGHT - Test describe

## Test describe
- Test suite = tập hợp test case 
    ```
    test.describe('<suite_name>', async () => {
        test('test1', async ({ page }) => {
            // code ...
        });
    test('test 2', async ({ page }) => {
        // code ...
        });
    })

## Hooks 
- Là các thời điểm chạy test, suite: 
    - Trước khi chạy 
    - Trong khi chạy 
    - Sau khi chạy
- Các hooks: 
    - beforeAll: Khởi tạo trình duyệt, kết nối database, thiết lập dữ liệu ban đầu
    - beforeEach: Điều hướng đến trang web, đăng nhập trước mỗi test
    - afterEach: Dọn dẹp dữ liệu test, reset state
    - afterAll: Đóng trình duyệt, ngắt kết nối database

## Playwright assertion
- Không dùng web-first assertion: Chờ cứng X (s)
- Dùng web-first assertion" Chờ flexible X (s)


# CSS SELECTOR & PLAYWRIGHT SELECTOR
## CSS selector 
- Ex: 
    - //div -> div 
    - //form[@id="text"] -> #text
    - //div[@class='form-group'] -> .form-group
    - //div[@id='parent']/input -> #parent > input
    - //div[@id='ancestor']/descendant::div -> #ancestor div
    - //div | //input -> div, input 
    - //div[@id='parent']/following-sibling::*[1] -> #parent + div

## Playwright selector: 
- Link: 
    - https://playwright.dev/docs/locators 
    - https://www.w3.org/TR/html-aria/#docconformance 
- Playwright locator thường dùng: 
    - page.getByRole()
    - page.getByText()
    - page.getByLabel()
    - page.getByPlaceholder()
    - page.getByAltText()
    - page.getByTitle()
    - page.getByTestId()