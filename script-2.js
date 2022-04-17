const func = (str, obj) => {
    return str in obj;
}

// Создаем объект
const obj1 = {
    name: "Koly",
    age: 30,
    a: "ffff",
    b: 125,
    c:false
}

console.log (func ('name', obj1));      // true
console.log (func ('age', obj1));       // true
console.log (func ('abc', obj1));       // false