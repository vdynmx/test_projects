

const sayHello = (name) => console.log('Hi ' + name);

sayHello('Johann');

sayHello2arg = (greet,name) => {
  console.log(greet + " " + name);
}

sayHello2arg('Hello', 'Johanny');

sayHellostr = () => {
  console.log('Heya, Jack');
}

sayHellostr();

let helloReturn = function (name, greet = 'Yeehaw') {
  let greeting;
  return greeting = console.log(greet + name); 
}

helloReturn('Hooza','Charles');

function checkInput (nofun, ...arguments) {
  let empty = false;
  for (const text of arguments) {
    if (!text) {
      empty = true;
      break;
    }
  }

  if (!empty) {
    nofun();
  }
}

let noFun = function () {
  console.log('Not  empty');
}

checkInput(noFun, 'Jac', 'Jill','Hill',);