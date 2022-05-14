console.log('Sección 1 - Introducción');

//
// FUNCIÓN DE PRIMER ORDEN (acepta valores como parámetros)
//
function sum(a: number, b: number): number {
  return a + b;
}

const primerRes = sum(3, 5);

console.log(primerRes);

//
// FUNCIÓN DE ORDEN SUPERIOR (acepta funciones como parámetros)
//
function operation(fn: Function, a: number, b: number): number {
  return fn(a, b);
}

const superiorRes = operation(sum, 5, 7);

console.log(superiorRes);

//
// ARROW FUNCTIONS
//
const myArrowFunction = (name: string) => {
  console.log(`Hi ${name}!`);
};

myArrowFunction('Miles');

const result = operation((a: number, b: number) => a * b, 5, 7); // No es necesario el "return" si el scope de la función no necesita llaves

console.log(result);

//
// ARRAY FOREACH
//
const names = ['Snoop Dog', '50 Cent', 'Eminem'];

names.forEach((element) => console.log(element));
names.forEach((element) => console.log(element.toUpperCase()));

console.log(names); // 'forEach' es un método inmutable (no altera los valores del array sobre el que se ejecuta)

names.sort(); // 'sort' es un método mutable (altera el array sobre el que se ejecuta)
console.log(names);

//
// MAP
//
const namesUpper = names.map((element) => element.toUpperCase()); // 'map' devuelve un nuevo array, aplicando una operación a los elementos del array original
console.log(namesUpper);

//
// REDUCE
//
const numbers = [5, 7, 2, 9, 35];
const total = numbers.reduce((prev, current) => prev + current); // 'reduce' itera el array aplicando una operación entre el elemento anterior y el actual
console.log(total);

//
// PROGRAMACIÓN ORIENTADA A OBJETOS
// - CLASES
//
class Drink {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  info(): string {
    return `This drink is ${this.name}`;
  }
}

const drink = new Drink('water');
console.log(drink.info());

//
// PROGRAMACIÓN ORIENTADA A OBJETOS
// - EXTENDER CLASES
//
class Beer extends Drink {
  private alcohol: number;

  constructor(name: string, alcohol: number) {
    super(name);
    this.alcohol = alcohol;
  }

  graduation(): string {
    return `This beer has ${this.alcohol}% of alcohol`;
  }
}

const beer = new Beer('Estrella Levante', 5.5);
console.log(beer.info()); // método heredado de la clase padre (Drink)
console.log(beer.graduation()); // método implementado en la clase hija (Beer)

class Liquor extends Drink {
  private type: string;

  constructor(name: string, type: string) {
    super(name);
    this.type = type;
  }

  info(): string {
    // Se pueden sobreescribir métodos de la clase padre en la clase hijo
    return super.info() + ` and is a liquor of type ${this.type}`; // Se pueden utilizar métodos de la clase padre a través de 'super'
  }
}

const ginebra = new Liquor('Martin Miller', 'ginebra');
console.log(ginebra.info());

//
// INTERFACES
//
interface Product {
  price: number;
  getPrice(): string;
}

class SoftDrink extends Drink implements Product {
  public price: number;

  constructor(name: string, price: number) {
    super(name);
    this.price = price;
  }

  getPrice(): string {
    return `El precio es ${this.price}`;
  }
}

const kombucha = new SoftDrink('Brava Kombucha', 1.2);

console.log(kombucha.getPrice());

class Snack implements Product {
  public price: number;
  constructor(price: number) {
    this.price = price;
  }

  getPrice(): string {
    return `El precio es ${this.price}`;
  }
}

const products: Product[] = [new SoftDrink('Cola', 1.1), new Snack(2)];

products.map((product) => {
  console.log(product.getPrice());
});
