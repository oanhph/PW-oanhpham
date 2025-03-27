/* 1. Viết một hàm để tính chỉ số BMI (Body Mass Index) dựa trên chiều cao (mét) và cân
nặng (kg) và trả về phân loại BMI (Thiếu cân, Bình thường, Thừa cân, Béo phì).
Biết:
○ Chiều cao được tính theo đơn vị mét (VD: 1.75m)
○ Cân nặng tính theo kg
○ Công thức tính BMI: cân nặng / (chiều cao*chiều cao)
○ BMI < 18.5: Thiếu cân
○ BMI < 25: Bình thường
○ BMI < 30: Thừa cân
○ BMI >= 30: Béo phì
*/
function calculateBMI(height, weight) {
    let bmi = weight / (height * height);
    let type = [
        "Thiếu cân",
        "Bình thường",
        "Thừa cân",
        "Béo phì"
    ]
    if (bmi < 18.5) {
        return type[0];
    }
    else if (bmi < 25) {
        return type[1];
    }
    else if (bmi < 30) {
        return type[2];
    }
    else if (bmi >= 30) {
        return type[3];
    }
};
console.log(calculateBMI(1.84, 45));
console.log(calculateBMI(1.84, 66));
console.log(calculateBMI(1.62, 68));
console.log(calculateBMI(1.50, 71));


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

/* 3. Viết một hàm để lọc ra các số nguyên tố từ một mảng số đã cho.
Biết:
○ Số 0, số 1 không phải số nguyên tố.
○ Các số nguyên tố là số chỉ chia hết cho 1 và chính nó
*/
