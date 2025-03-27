/* 2. Viết một hàm để chuyển đổi nhiệt độ từ độ C sang độ F và ngược lại. Hàm sẽ nhận
vào giá trị nhiệt độ và loại nhiệt độ ('C' hoặc 'F') và trả về nhiệt độ đã chuyển
đổi.
Biết công thức chuyển đổi:
○ Từ độ C sang độ F: độ F = (độ C) * 9/5 + 32;
○ Từ độ F sang độ C: (độ F - 32) * 5 / 9;
*/

function temperatureConvert(temperatureValue, degreeType) {
    let convertToF = temperatureValue * 9 / 5 + 32;
    let convertToC = (temperatureValue - 32) * 5 / 9;
    if (degreeType === "C") {
        return convertToF;
    }
    else if (degreeType === "F") {
        return convertToC;
    }
    else {
        return "Invalid degree type";
    }
};
console.log(temperatureConvert(30, "C"));
console.log(temperatureConvert(30, "F"));
console.log(temperatureConvert(30, "T"));