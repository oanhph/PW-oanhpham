/* 7. Viết hàm in ra tên tháng dựa vào số tháng được nhập vào. Sử dụng câu lệnh
switch...case để xử lý.
*/

function printMonthName(month) {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "Octorber";
        case 11:
            return "November";
        case 12:
            return "December";
    }
    if (month >= 1 && month <=12) {
        return printMonthName;
    }
    else {
        return "Invalid month";
    }
}
console.log(printMonthName(22));
console.log(printMonthName(5));
