//
// FIRST EXAMPLE
//

//
// Strategy Interface
//
interface ISaleStrategy {
  calculate(amount: number): number;
}

//
// Context Class
//
class SalesContext {
  strategy;

  constructor(strategy: ISaleStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ISaleStrategy) {
    this.strategy = strategy;
  }

  calculate(amount: number) {
    return this.strategy.calculate(amount);
  }
}

//
// Strategy Class 1
//
class RegularSaleStrategy implements ISaleStrategy {
  taxPercent: number;

  constructor(taxPercent: number) {
    this.taxPercent = taxPercent;
  }

  calculate(amount: number): number {
    return amount + (this.taxPercent / 100) * amount;
  }
}

//
// Strategy Class 2
//
class DiscountSaleStrategy implements ISaleStrategy {
  taxPercent: number;
  discountPercent: number;

  constructor(taxPercent: number, discountPercent: number) {
    this.taxPercent = taxPercent;
    this.discountPercent = discountPercent;
  }

  calculate(amount: number): number {
    const totalPrice = amount + amount * (this.taxPercent / 100);
    return totalPrice - totalPrice * (this.discountPercent / 100);
  }
}

// Instance of Strategy 1
const regularSale = new RegularSaleStrategy(21);

// Instance of Strategy 2
const discountSale = new DiscountSaleStrategy(21, 10);

// Dependency Injection of strategy 1
const saleAmount = new SalesContext(regularSale);

// Result 1
console.log(saleAmount.calculate(100));

// Change to strategy 2
saleAmount.setStrategy(discountSale);

// Result 2
console.log(saleAmount.calculate(100));

//
// SECOND EXAMPLE
//
const beerData = [
  {
    name: 'Erdinger Pikantus',
    country: 'Alemania',
    info: 'Erdinger Pikantus es una cerveza de estilo weizenbock elaborada en la localidad bávara de Erding.',
    img: 'dxjcdxuv6chk2.cloudfront.net/assets/biere/flascheglas/pikantus-2020-v2.png',
  },

  {
    name: 'Corona',
    country: 'México',
    info: 'La cerveza Corona es una marca mundialmente conocida, distribuida a lo largo de más de 159 países en los cinco continentes.',
    img: 'upload.wikimedia.org/wikipedia/commons/0/0c/Corona-6Pack.JPG',
  },

  {
    name: 'Delirium Tremens',
    country: 'Bélgica',
    info: 'Esta pale ale tiene una efervescencia fina con un toque un tanto picante. Al tomarse, calienta el paladar y deja un sabor fuerte y de un amargor seco.',
    img: 'www.delirium.be/themes/custom/delirium/assets/img/beers/beer_delirium_tremens_bottle.png',
  },
];

interface IBeerStrategy {
  show(data: typeof beerData, element: string): string;
}

class InfoContext {
  strategy: IBeerStrategy;
  data: typeof beerData;
  element: string;

  constructor(strategy: IBeerStrategy, data: typeof beerData, element: string) {
    this.strategy = strategy;
    this.data = data;
    this.element = element;
  }

  setStrategy(strategy: IBeerStrategy) {
    this.strategy = strategy;
  }

  show() {
    return this.strategy.show(this.data, this.element);
  }
}

class ListStrategy implements IBeerStrategy {
  show(data: typeof beerData, element: string): string {
    const result = data.reduce((prev, beer) => {
      return (
        prev +
        `
        <div>
          <h2>${beer.name}</h2>
          <p>${beer.country}</p>
        </div>
      `
      );
    }, `--- This is the normal strategy ---`);

    return result;
  }
}

class DetailedListStrategy implements IBeerStrategy {
  show(data: typeof beerData, element: string): string {
    const result = data.reduce((prev, beer) => {
      return (
        prev +
        `
        <div>
          <h2>${beer.name}</h2>
          <p>${beer.info}</p>
        </div>
      `
      );
    }, `--- This is the detailed strategy ---`);

    return result;
  }
}

const info = new InfoContext(new ListStrategy(), beerData, 'List Strategy');

console.log(info.show());

const detailedInfo = info.setStrategy(new DetailedListStrategy());

console.log(info.show());

//
// THIRD EXAMPLE
//
interface ILoginStrategy {
  login(user: string, password: string): boolean;
}

class LoginContext {
  private strategy: ILoginStrategy;

  constructor(strategy: ILoginStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ILoginStrategy) {
    this.strategy = strategy;
  }

  login(user: string, password: string): boolean {
    return this.strategy.login(user, password);
  }
}

class LoginStrategy implements ILoginStrategy {
  login(user: string, password: string): boolean {
    return user === 'user' && password === '1234' ? true : false;
  }
}

const myLogin = new LoginContext(new LoginStrategy());

console.log(myLogin.login('user', '1234'));
console.log(myLogin.login('user', '12345'));
