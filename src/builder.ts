console.log('Section 6 - Builder');

// Interfaces
interface IPerson {
  readonly name: string;
  readonly lastName: string;
  readonly age: number;
  readonly country: string;
  readonly hobbies: string[];

  reset(): void;
  build(): IPerson;

  setName(name: string): IPerson;
  setLastname(lastName: string): IPerson;
  setAge(age: number): IPerson;
  setCountry(country: string): IPerson;
  addHobby(hobby: string): IPerson;

  getName(): string;
  getLastname(): string;
  getAge(): number;
  getCountry(): string;
  getHobbies(): string[];
}

interface IDirector {
  personBuilder: PersonBuilder;

  setBuilder(personBuilder: PersonBuilder): void;
}

// Builder Class
class PersonBuilder implements IPerson {
  name: string;
  lastName: string;
  age: number;
  country: string;
  hobbies: string[];

  constructor() {
    this.name = '';
    this.lastName = '';
    this.age = 0;
    this.country = '';
    this.hobbies = [];
  }

  reset() {
    this.name = '';
    this.lastName = '';
    this.age = 0;
    this.country = '';
    this.hobbies = [];
  }

  build() {
    const persona = new PersonBuilder();
    persona.name = this.name;
    persona.lastName = this.lastName;
    persona.age = this.age;
    persona.country = this.country;
    persona.hobbies = this.hobbies;

    this.reset();

    return persona;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setLastname(lastName: string): IPerson {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number): IPerson {
    this.age = age;
    return this;
  }

  setCountry(country: string): IPerson {
    this.country = country;
    return this;
  }

  addHobby(hobby: string): IPerson {
    this.hobbies.push(hobby);
    return this;
  }

  getName(): string {
    return this.name;
  }

  getLastname(): string {
    return this.lastName;
  }

  getAge(): number {
    return this.age;
  }

  getCountry(): string {
    return this.country;
  }

  getHobbies(): string[] {
    return this.hobbies;
  }
}

// Director Class (create recipes for the builder)
class DirectorBuilder implements IDirector {
  personBuilder: PersonBuilder;

  constructor(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
    this.setBuilder(personBuilder);
  }

  setBuilder(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
  }

  createAthletic() {
    this.personBuilder.reset();
    this.personBuilder.addHobby('Football');
    this.personBuilder.addHobby('Running');
    this.personBuilder.addHobby('Mountain Bike');

    return this.personBuilder;
  }

  createSpanish() {
    this.personBuilder.reset();
    this.personBuilder.setCountry('Spain');

    return this.personBuilder;
  }
}

// Instance of Builder
const personBuilder = new PersonBuilder();

// Examples of Builder
const manuel = personBuilder
  .setName('Manuel')
  .setLastname('Rodríguez')
  .setAge(35)
  .setCountry('Spain')
  .addHobby('Music')
  .addHobby('Basket')
  .build();

console.log(manuel.getName());
console.log(manuel.getLastname());
console.log(manuel.getAge());
console.log(manuel.getCountry());
console.log(manuel.getHobbies());

const luis = personBuilder.setName('Luis').setLastname('Menéndez').build();

console.log(luis);

// Instance of Director
const recipesBuilder = new DirectorBuilder(new PersonBuilder());

// Instance and example 1 of Director
const athleticPerson = recipesBuilder.createAthletic();

athleticPerson.setName('Leo').setLastname('Messi');

console.log(athleticPerson);

// Instance and example 2 of Director
const spanishPerson = recipesBuilder.createSpanish();

spanishPerson.setName('Miguel').setLastname('De Cervantes');

console.log(spanishPerson);
