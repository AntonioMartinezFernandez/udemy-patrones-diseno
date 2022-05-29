console.log('Section 7 - State');

// Interfaces
interface IContext {
  state: IState;
  content: string;
  write(text: string): void;
}

interface IState {
  write(documentContext: IContext, text: string): void;
}

// Context
class DocumentContext implements IContext {
  private _state: IState;
  content: string;

  constructor() {
    this._state = new BlankState();
    this.content = '';
  }

  set state(state: IState) {
    this._state = state;
  }

  write(text: string) {
    this._state.write(this, text);
  }
}

// States
class BlankState implements IState {
  write(documentContext: DocumentContext, text: string) {
    documentContext.content = text;
    documentContext.state = new WithContentState();
  }
}

class WithContentState implements IState {
  write(documentContext: DocumentContext, text: string) {
    documentContext.content += ' ' + text;
  }
}

class ClosedState implements IState {
  write(documentContext: IContext, text: string): void {
    console.log('Document closed. It cant be modified.');
  }
}

// Example
const doc = new DocumentContext();
console.log(doc);

doc.write('First Lorem Ipsum');
console.log(doc);

doc.write('Second Lorem Ipsum');
console.log(doc);

doc.state = new ClosedState();
doc.write('Third Lorem Ipsum');
console.log(doc);
