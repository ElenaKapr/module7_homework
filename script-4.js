// Объект для электросчетчика
const electricityMeter = {
    powerTools: [],
    includeInMeter: function (obj) {
        this.powerTools.push (obj);
        console.log (`Прибор "${obj.name}" подключен к электросчетчику: потребляемая мощность - ${obj.powerСonsumption} Вт`);
    },
    excludeFromMeter: function (obj) {
        let index = -1;
        this.powerTools.forEach ((item, i) => item == obj ? index = i : index = index);
        if (index >= 0) {
            this.powerTools.splice (index, 1);
            console.log (`Прибор "${obj.name}" отключен от электросчетчика`);
        } else {
            console.log (`C прибором "${obj.name}" что-то пошло не так`);
        }
    },
    meterReadings: function () {
        let result = this.powerTools.reduce((sum, current) => sum + current.powerСonsumption, 0)
        console.log (`Общая потребляемая мощность = ${result} Вт`);
    }
}

// Базовый конструктор для электроприбора
function PowerTool (name, powerСonsumption) {
    this.name = name;                                   // Название прибора
    this.powerСonsumption = powerСonsumption;           // Потребляемая мощность
    this.plug_in = "Off";                               // Включен ли прибор в розетку
    this.power = true;                                  // Прибор включается сразу
}

PowerTool.prototype.plugin = function () {              // Включить прибор в розетку
    this.plug_in = "On";
    console.log (`Прибор "${this.name}" включен в розетку`);
    if (this.power) this.powerOn ();
}

PowerTool.prototype.unplug = function () {              // Выключить прибор из розетки
    if (this.power) this.powerOff();
    this.plug_in = "Off";
    console.log (`Прибор "${this.name}" выключен из розетки`);
}

PowerTool.prototype.powerOn = function () {              // Включить прибор
    electricityMeter.includeInMeter (this);
}

PowerTool.prototype.powerOff = function () {              // Выключить прибор
    electricityMeter.excludeFromMeter (this);
}

// Расширяем базовый конструктор для приборов, которые имеют свою кнопку включения
function PowerButtonTool(name, powerСonsumption) {
    PowerTool.call(this, name, powerСonsumption);
    this.power = false;                                 // Прибор включается не сразу
    this.powerButton = "Off";                           // Кнопка включения
}

// Устанавливаем прототипную связь свойства prototype производного класса с prototype базового класса
Object.setPrototypeOf(PowerButtonTool.prototype, PowerTool.prototype);

PowerButtonTool.prototype.powerOn = function () {           // Включаем кнопку на приборе
    if (this.plug_in == "On" && this.powerButton == "Off") {
        console.log (`Прибор "${this.name}" - нажата кнопка включения`);
        this.powerButton = "On";
        PowerTool.prototype.powerOn.call (this);
    } else if (this.plug_in == "On" && this.powerButton == "On") {
        console.log (`Прибор "${this.name}" - ничего не делаем, кнопка включения уже нажата`);
    } else {
        this.powerButton = "Off";
        console.log (`Прибор "${this.name}" не включен в розетку`);
    }
}

PowerButtonTool.prototype.powerOff = function () {          // Выключаем кнопку на приборе
    if (this.plug_in == "On" && this.powerButton == "On") {
        console.log (`Прибор "${this.name}" - выключен`);
        PowerTool.prototype.powerOff.call (this);
    }
    this.powerButton = "Off";
}

const ceilingLamp = new PowerTool ("лампа на потолке", 70);

const fridge = new PowerTool ("холодильник", 100);
fridge.color = 'белый';

const teapot = new PowerButtonTool ("чайник", 1500);
teapot.color = 'серый';
teapot.volume = '1.5 литра';

const coffeeMaker = new PowerButtonTool ("кофеварка", 600);
coffeeMaker.color = 'черный';
coffeeMaker.volume = '2 чашки';

ceilingLamp.plugin();           
    // Прибор "лампа на потолке" включен в розетку
    // Прибор "лампа на потолке" подключен к электросчетчику: потребляемая мощность - 70 Вт

coffeeMaker.plugin();
    // Прибор "кофеварка" включен в розетку

fridge.plugin();
    // Прибор "холодильник" включен в розетку
    // Прибор "холодильник" подключен к электросчетчику: потребляемая мощность - 100 Вт

electricityMeter.meterReadings ();
    // Общая потребляемая мощность = 170 Вт

teapot.powerOn();
    // Прибор "чайник" не включен в розетку

coffeeMaker.powerOn();
    // Прибор "кофеварка" - нажата кнопка включения
    // Прибор "кофеварка" подключен к электросчетчику: потребляемая мощность - 600 Вт

teapot.plugin();
    // Прибор "чайник" включен в розетку

teapot.powerOn();
    // Прибор "чайник" - нажата кнопка включения
    // Прибор "чайник" подключен к электросчетчику: потребляемая мощность - 1500 Вт

teapot.powerOn();
    // Прибор "чайник" - ничего не делаем, кнопка включения уже нажата

electricityMeter.meterReadings ();
    // Общая потребляемая мощность = 2270 Вт

teapot.powerOff();
    // Прибор "чайник" - выключен
    // Прибор "чайник" отключен от электросчетчика

coffeeMaker.powerOff();
    // Прибор "кофеварка" - выключен
    // Прибор "кофеварка" отключен от электросчетчика

ceilingLamp.unplug();
    // Прибор "лампа на потолке" отключен от электросчетчика
    // Прибор "лампа на потолке" выключен из розетки

fridge.unplug();
    // Прибор "холодильник" отключен от электросчетчика
    // Прибор "холодильник" выключен из розетки

electricityMeter.meterReadings ();
    // Общая потребляемая мощность = 0 Вт