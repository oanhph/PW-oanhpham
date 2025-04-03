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
