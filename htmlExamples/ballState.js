class Ball {
  constructor(context, canvas, ballSize) {
    this.context = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ballSize = ballSize;

    this.positionX = 0;
    this.positionY = 0;

    this.state = new StateOne();
  }

  setState(state) {
    this.state = state;
  }

  printball() {
    this.state.print(this);
  }
}

class StateOne {
  print(ball) {
    ball.context.clearRect(0, 0, ball.width, ball.height);
    ball.context.beginPath();

    ball.context.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize,
    );

    if (ball.positionX < ball.width - ball.ballSize) {
      ball.positionX += ball.ballSize;
    } else {
      ball.setState(new StateTwo());
    }
  }
}

class StateTwo {
  print(ball) {
    ball.context.clearRect(0, 0, ball.width, ball.height);
    ball.context.beginPath();

    ball.context.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize,
    );

    if (ball.positionY < ball.height - ball.ballSize) {
      ball.positionY += ball.ballSize;
    } else {
      ball.setState(new StateThree());
    }
  }
}

class StateThree {
  print(ball) {
    ball.context.clearRect(0, 0, ball.width, ball.height);
    ball.context.beginPath();

    ball.context.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize,
    );

    if (ball.positionX > 0) {
      ball.positionX -= ball.ballSize;
    } else {
      ball.setState(new StateFour());
    }
  }
}

class StateFour {
  print(ball) {
    ball.context.clearRect(0, 0, ball.width, ball.height);
    ball.context.beginPath();

    ball.context.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize,
    );

    if (ball.positionY > 0) {
      ball.positionY -= ball.ballSize;
    } else {
      ball.setState(new StateOne());
    }
  }
}

const context = canvas.getContext('2d');
context.fillStyle = '#555';

const ball = new Ball(context, canvas, 25);

setInterval(() => ball.printball(), 50);
