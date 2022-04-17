const func = obj => {
    // Object.entries() метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value]
    for (const [key, value] of Object.entries (obj)) {
        console.log (`${key}: ${value}`);
    }
}

// Объект прототип
const objPrototype = {
    h: "00000",
    p: true
}

// Объект, созданный на основе прототипа
const obj1 = Object.create (objPrototype);
obj1.name = "Koly";
obj1.age = 30;
obj1.a = "ffff" ;
obj1.b = 125;
obj1.c = false;

func (obj1);

// Результат:
//      name: Koly
//      age: 30
//      a: ffff
//      b: 125
//      c: false