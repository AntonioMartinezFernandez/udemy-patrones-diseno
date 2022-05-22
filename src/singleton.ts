console.log('Section 2 - Singleton');

//
//  CREAR UNA CLASE CON PATRÓN SINGLETON
//
class Singleton {
  randomNumber: number;
  private static instance: any; // IMPORTANTE: la variable 'instance' debe ser privada y estática

  constructor() {
    console.log('Constructor of Singleton...');

    this.randomNumber = Math.random();

    if (Singleton.instance) {
      console.log('Return instance of Singleton...');
      return Singleton.instance;
    }

    console.log('Creating instance of Singleton...');
    Singleton.instance = this;
  }

  // IMPORTANTE: la clase 'getInstance' debe ser declarada como pública y estática
  public static getInstance() {
    return this.instance;
  }
}

const firstSingleton = new Singleton();
const secondSingleton = new Singleton();
const thirdSingleton = Singleton.getInstance();

console.log(firstSingleton === secondSingleton);
console.log(firstSingleton === thirdSingleton);

console.log(firstSingleton.randomNumber);
console.log(secondSingleton.randomNumber);
console.log(thirdSingleton.randomNumber);

//
//  CREAR UNA CLASE CON PATRÓN SINGLETON MANTENIENDO EL CONSTRUCTOR COMO PRIVADO
//
class SingletonPrivate {
  randomNumber: number;
  private static instance: any; // IMPORTANTE: la variable 'instance' debe ser privada y estática

  private constructor() {
    console.log('Constructor of SingletonPrivate...');
    this.randomNumber = Math.random();
  }

  // IMPORTANTE: la clase 'getInstance' debe ser declarada como pública y estática
  public static getInstance() {
    if (!this.instance) {
      console.log('Creating instance of SingletonPrivate...');
      this.instance = new SingletonPrivate(); // Creamos la instancia llamando al constructor, al que tenemos acceso desde los métodos propios de la propia clase aunque sea privado
    }

    console.log('Return instance of SingletonPrivate...');
    return this.instance;
  }
}

// No podemos instanciar la clase SingletonPrivate mediante el constructor porque es privado
//const firstSingletonPrivate = new SingletonPrivate;

// Instanciamos la clase SingletonPrivate mediante el método 'getInstance'
const firstSingletonPrivate = SingletonPrivate.getInstance();
const secondSingletonPrivate = SingletonPrivate.getInstance();
console.log(firstSingletonPrivate.randomNumber);
console.log(secondSingletonPrivate.randomNumber);

// Si cambiamos el valor de una variable en una de las instancias, cambia en las demás instancias de la misma clase
firstSingletonPrivate.randomNumber = 5;

console.log(firstSingletonPrivate.randomNumber);
console.log(secondSingletonPrivate.randomNumber);

//
//  EJEMPLO DE USO CON PATRÓN SINGLETON
//
class WeekDays {
  private static instance: any;

  language: string;

  spanish = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  english = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(language: string) {
    this.language = language;

    if (WeekDays.instance) {
      return WeekDays.instance;
    }

    WeekDays.instance = this;
  }

  static getInstance() {
    return WeekDays.instance;
  }

  getDay(dayNumber: number): string {
    return this.language === 'spanish'
      ? this.spanish[dayNumber - 1]
      : this.english[dayNumber - 1];
  }
}

// Crea 2 instancias de la clase WeekDays y devuelve el valor correcto
const numberToDay = new WeekDays('english');
const numberOfWeekday = WeekDays.getInstance();

console.log(numberToDay.getDay(2));
console.log(numberOfWeekday.getDay(2));

// Si volvemos a instanciar la clase con distintos argumentos,
// estos argumentos serán descartados y recibiremos la instancia que fue creada la primera vez
const numeroDiaSemana = new WeekDays('spanish');
console.log(numeroDiaSemana.getDay(2));
