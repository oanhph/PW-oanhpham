/* 8. Viết hàm có một tham số là nhiệt độ, in ra nhiệt độ và thông báo trạng thái thời tiết: nóng
(>= 30 độ C), mát (< 30 độ C và >= 20 độ C), lạnh (< 20 độ C)
*/

function weather(temperature) {
    console.log(`Nhiet do: ${temperature} `);
    if (temperature >= 30) {
        console.log("Nong");
    }
    else if (temperature < 30 && temperature >= 20) {
        console.log("Mat");
    }
    else if (temperature < 20) {
        console.log("Lanh");
    }
}
weather(30);
weather(40);
weather(20);
weather(29);
weather(19);
weather(-1);