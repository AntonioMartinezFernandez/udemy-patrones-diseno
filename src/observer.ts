console.log('Section 4 - Observer');

//
// Interfaces
//
interface IObserver<T> {
  refresh(data: T[]): void;
}

interface ISubject<T> {
  observers: IObserver<T>[];
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(data: T[]): void;
}

//
// Classes
//
class Subject<T> implements ISubject<T> {
  observers: IObserver<T>[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: IObserver<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver<T>): void {
    this.observers.filter((obs) => obs !== observer);
  }

  notify(data: T[]): void {
    this.observers.forEach((e) => {
      e.refresh(data);
    });
  }
}

class ElementSubject<T> extends Subject<T> {
  data: T[];

  constructor() {
    super();
    this.data = [];
  }

  add(element: T) {
    console.log('Data added...');
    this.data.push(element);
    this.notify(this.data);
  }
}

class ConsoleObserver<T> implements IObserver<T> {
  constructor() {
    console.log('Observer created');
  }

  refresh(data: T[]): void {
    console.log(data);
  }
}

class ConsoleCounterObserver<T> implements IObserver<T> {
  func: (data: T[]) => void;

  constructor(func: (data: T[]) => void) {
    console.log('Observer counter created');
    this.func = func;
  }

  refresh(data: T[]): void {
    this.func(data);
  }
}

// Create instances of subject and observer
const subject = new ElementSubject<string | number>();

const observer = new ConsoleObserver<string | number>();
const observerCounter = new ConsoleCounterObserver<string | number>(
  (data: (string | number)[]) => {
    console.log(data.length);
  },
);

// Subscribe the observers to the subject
subject.subscribe(observer);
subject.subscribe(observerCounter);

// When we change the state of the subject, the observers react to this changes
subject.add('Element 1');
subject.add('Element 2');
subject.add('Element 3');
