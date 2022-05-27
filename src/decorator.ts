console.log('Section 5 - Decorator');

// Interface
interface IComponent {
  name: string;
  getDetail(): string;
}

// Main Class
class ProductComponent implements IComponent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getDetail(): string {
    return `${this.name}`;
  }
}

// Decorator Class
abstract class ProductDecorator implements IComponent {
  protected productComponent: ProductComponent;
  name: string = ProductComponent.name;

  constructor(productComponent: IComponent) {
    this.productComponent = productComponent;
  }

  getDetail(): string {
    return this.productComponent.getDetail();
  }
}

// Usecase Decorator 1
class StoreProductDecorator extends ProductDecorator {
  price: number;

  constructor(productComponent: IComponent, price: number) {
    super(productComponent);
    this.price = price;
  }

  getDetail(): string {
    return super.getDetail() + ` costs ${this.price}€`;
  }
}

// Usecase Decorator 2
class CommercialInfoProductDecorator extends ProductDecorator {
  tradename: string;
  brand: string;

  constructor(productComponent: IComponent, tradename: string, brand: string) {
    super(productComponent);
    this.tradename = tradename;
    this.brand = brand;
  }

  getDetail(): any {
    const data = {
      tradename: this.tradename,
      brand: this.brand,
      product: super.getDetail(),
    };
    return data;
  }
}

// Usecase Decorator 3
class ResponseProductDecorator extends ProductDecorator {
  constructor(productComponent: IComponent) {
    super(productComponent);
  }

  getDetail(): any {
    return { data: super.getDetail(), status: 201 };
  }
}

// Implementation
const product = new ProductComponent('Beer');

const storeDecorator = new StoreProductDecorator(product, 3);

const commercialDecorator = new CommercialInfoProductDecorator(
  product,
  'London Porter',
  "Fuller's",
);

const response = new ResponseProductDecorator(commercialDecorator);

console.log(product.getDetail());
console.log(storeDecorator.getDetail());
console.log(commercialDecorator.getDetail());
console.log(response.getDetail());
