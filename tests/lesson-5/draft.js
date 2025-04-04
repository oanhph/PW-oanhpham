function convert(text) {
    return text
        .replace(/Đ/g, "D")
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

let validSlug3 = "Đây là tag đặc biệt @100 $200";
let expectedSlug3 = convert(validSlug3);
console.log(expectedSlug3);