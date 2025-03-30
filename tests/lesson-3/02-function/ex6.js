/* 6. Viết hàm có tham số là tuổi, in ra mức giá vé vào cổng tùy theo độ tuổi: trẻ em dưới 5
tuổi miễn phí, người lớn từ 18 tuổi trở lên là 100k, và trẻ em từ 6 đến 17 tuổi là 50k.
*/

function priceTicket(age) {
    let price;
    if (age < 5) {
        price = 0;
        return price;
    }
    else if (age >= 18) {
        price = 100;
        return price;
    }
    else if (age >= 6 && age <= 17) {
        price = 50;
        return price;
    }
    else {
        return "Undefined";
    }
}
console.log(priceTicket(6));
console.log(priceTicket(17));
console.log(priceTicket(15));
console.log(priceTicket(5));
console.log(priceTicket(4));
console.log(priceTicket(18));
console.log(priceTicket(20));
