/* 5. Viết một hàm tính điểm trung bình của các sinh viên dựa trên điểm số lưu trong một
mảng các object.
Biết object có cấu trúc như sau: {“name”: “Alex”, score: 85}
*/

let tableScore = [
    {
        name: "Alex",
        score: 85
    },
    {
        name: "Nellie",
        score: 98
    },
    {
        name: "Amber",
        score: 78
    }
];
function scoreAverage() {
    let sum = 0;
    for (let i = 0; i < tableScore.length; i++) {
        sum += tableScore[i].score;
    }
    return sum / tableScore.length;
}
console.log(scoreAverage());
