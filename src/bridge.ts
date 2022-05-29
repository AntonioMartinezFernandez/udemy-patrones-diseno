console.log('Section 8 - Bridge');

// Interfaces
interface IAbstraction {
  implementor: ListImplementor;
  add(number: number): void;
  get(): number[];
  operation(fn: (n: number) => number): number[];
}

interface ListImplementor {
  elements: number[];

  add(number: number): void;
  getElements(): number[];
}

// Abstraction Class
class DataRefinedAbstraction implements IAbstraction {
  implementor: ListImplementor;

  constructor(implementor: ListImplementor) {
    this.implementor = implementor;
  }

  add(number: number) {
    this.implementor.add(number);
  }

  get(): number[] {
    return this.implementor.getElements();
  }

  operation(fn: (n: number) => number): number[] {
    return this.implementor.getElements().map(fn);
  }
}

// Implementor Classes
class OrderedList implements ListImplementor {
  elements: number[];
  constructor() {
    this.elements = [];
  }

  add(number: number): void {
    this.elements.push(number);
    this.elements.sort();
  }

  getElements(): number[] {
    return this.elements;
  }
}

class UniqueList implements ListImplementor {
  elements: number[];

  constructor() {
    this.elements = [];
  }

  add(number: number): void {
    const unique = this.elements.find((e) => e === number);
    if (!this.elements.includes(number)) {
      this.elements.push(number);
    }
  }

  getElements(): number[] {
    return this.elements;
  }
}

// Example 1

const orderedData = new DataRefinedAbstraction(new OrderedList());

orderedData.add(3);
orderedData.add(8);
orderedData.add(1);
orderedData.add(9);

console.log(orderedData.get());
console.log(orderedData.operation((e) => e * 2));

// Example 2
const uniqueData = new DataRefinedAbstraction(new UniqueList());

uniqueData.add(3);
uniqueData.add(3);
uniqueData.add(1);
uniqueData.add(3);

console.log(uniqueData.get());
console.log(uniqueData.operation((e) => e * 2));
