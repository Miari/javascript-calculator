//form elements
const inputValue = document.getElementById("inputNumber");
const formInputs = document.querySelectorAll(".button");

const setNumbersForCalculation = (calculatorRecieved, valueFromButtonRecieved) => {
  if (calculatorRecieved.operation) {
    if (calculatorRecieved.secondValue === undefined) {
      calculatorRecieved.secondValue = Number(valueFromButtonRecieved);
    } else {
      const newValueSecond = calculatorRecieved.secondValue + valueFromButtonRecieved;
      calculatorRecieved.secondValue = Number(newValueSecond);
    }
    inputValue.value = calculatorRecieved.secondValue;
  } else {
    if (calculatorRecieved.firstValue === undefined) {
      calculatorRecieved.firstValue = Number(valueFromButtonRecieved);
    } else {
      const newValueFirst = calculatorRecieved.firstValue + valueFromButtonRecieved;
      calculatorRecieved.firstValue = Number(newValueFirst);
    }
    inputValue.value = calculatorRecieved.firstValue;
  }
  return calculatorRecieved;
}

const clearAll = (calculatorRecieved) => {
  calculatorRecieved.firstValue = undefined;
  calculatorRecieved.secondValue = undefined;
  calculatorRecieved.operation = '';
  calculatorRecieved.previousOperation = '';
  inputValue.value = 0;
  return calculatorRecieved;
}

const calculateValue = (firstValueRecieved, secondValueRecieved, operationRecieved) => {
  //console.log("in calculateValue Function" + operationRecieved + " " + firstValueRecieved + " " + secondValueRecieved);
  switch (operationRecieved) {
    case '+':
      firstValueRecieved += secondValueRecieved;
      break;
    case '-':
      firstValueRecieved -= secondValueRecieved;
      break;
    case 'x':
      firstValueRecieved *= secondValueRecieved;
      break;
    case '/':
      if (secondValueRecieved === 0) firstValueRecieved = 0;
      else firstValueRecieved /= secondValueRecieved;
      break;
    case '%':
      firstValueRecieved = firstValueRecieved / 100;
      break;
    case '+/-':
      console.log("here");
      firstValueRecieved = 0 - firstValueRecieved;
      break;
  }
  return firstValueRecieved;
}

const doCalculation = (calculatorRecieved, valueFromButtonRecieved) => {
  console.log("Start of doCalculation");
  console.log("1st " + calculatorRecieved.firstValue);
  console.log("2st " + calculatorRecieved.secondValue);
  console.log("OP " + calculatorRecieved.operation);
  console.log("Prevoius OP " + calculatorRecieved.previousOperation);
  console.log("ValueFromButton " + valueFromButtonRecieved);
  if (!calculatorRecieved.firstValue) {
    calculatorRecieved.firstValue = 0;
  }

  if (valueFromButtonRecieved === "%") {
    calculatorRecieved.operation = '%';
    calculatorRecieved.firstValue = calculateValue(calculatorRecieved.firstValue, 0, calculatorRecieved.operation);
    inputValue.value = calculatorRecieved.firstValue;
  } else if (valueFromButtonRecieved === "+/-") {
    calculatorRecieved.operation = '+/-';
    console.log("here1 " + calculatorRecieved.firstValue);
    calculatorRecieved.firstValue = calculateValue(calculatorRecieved.firstValue, 0, calculatorRecieved.operation);
    inputValue.value = calculatorRecieved.firstValue;
  } else if (calculatorRecieved.secondValue && valueFromButtonRecieved !== "=") {
    calculatorRecieved.firstValue = calculateValue(calculatorRecieved.firstValue, calculatorRecieved.secondValue, calculatorRecieved.operation);
    calculatorRecieved.secondValue = undefined;
    inputValue.value = calculatorRecieved.firstValue;
  } else if (!calculatorRecieved.secondValue && valueFromButtonRecieved === "=" && !calculatorRecieved.operation) {
    calculatorRecieved.firstValue = undefined;
    calculatorRecieved.operation = '';
  } else if (calculatorRecieved.secondValue && valueFromButtonRecieved === "=" && calculatorRecieved.operation !== "=") {
    calculatorRecieved.firstValue = calculateValue(calculatorRecieved.firstValue, calculatorRecieved.secondValue, calculatorRecieved.operation);
    inputValue.value = calculatorRecieved.firstValue;
  } else if (calculatorRecieved.secondValue && valueFromButtonRecieved === "=" && calculatorRecieved.operation === "=") {
    calculatorRecieved.firstValue = calculateValue(calculatorRecieved.firstValue, calculatorRecieved.secondValue, calculatorRecieved.previousOperation);
    inputValue.value = calculatorRecieved.firstValue;
  } else if (!calculatorRecieved.secondValue && valueFromButtonRecieved === "=" && calculatorRecieved.operation !== "=") {
    calculatorRecieved.secondValue = Number(inputValue.value);
    calculatorRecieved.firstValue = calculateValue(calculatorRecieved.firstValue, calculatorRecieved.secondValue, calculatorRecieved.operation);
    inputValue.value = calculatorRecieved.firstValue;
  }

  switch (valueFromButtonRecieved) {
    case '+':
      calculatorRecieved.operation = "+";
      calculatorRecieved.previousOperation = '';
      break;
    case '-':
      calculatorRecieved.operation = "-";
      calculatorRecieved.previousOperation = '';
      break;
    case 'x':
      calculatorRecieved.operation = "x";
      calculatorRecieved.previousOperation = '';
      break;
    case '/':
      calculatorRecieved.operation = "/";
      calculatorRecieved.previousOperation = '';
      break;
    case '%':
      calculatorRecieved.operation = "%";
      calculatorRecieved.previousOperation = '';
      break;
    case '=':
      if (calculatorRecieved.operation && calculatorRecieved.operation !== '=') {
        calculatorRecieved.previousOperation = calculatorRecieved.operation;
        calculatorRecieved.operation = "=";
      }
      break;
    default: console.log("Undefined operation");
  }
 console.log("Result:");
  console.log("1st " + calculatorRecieved.firstValue);
  console.log("2st " + calculatorRecieved.secondValue);
  console.log("OP " + calculatorRecieved.operation);
  console.log("Previous OP " + calculatorRecieved.previousOperation);
  console.log("ValueFromButton " + valueFromButtonRecieved);
  console.log("End of doCalculation");
  console.log("_________________________________________");

  return calculatorRecieved;
}

class Calculator {
  constructor(firstValue = undefined, secondValue = undefined, operation = '', previousOperation = '') {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.operation = operation;
    this.previousOperation = previousOperation;
  }

  doOperation(calculatorInput, valueFromButton) {
    switch (valueFromButton) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        calculatorInput = setNumbersForCalculation(calculatorInput, valueFromButton);
        break;
      case 'C':
        calculatorInput = clearAll(calculatorInput);
        break;
      case '+':
      case '-':
      case '/':
      case 'x':
      case '%':
      case '=':
      case '+/-':
        calculatorInput = doCalculation(calculatorInput, valueFromButton);
        break;
      default: console.log("Unexpected function selected");
    }
  }
}

const calculator = new Calculator();

//listeners for buttons
formInputs.forEach((formInput) => {
  formInput.addEventListener("click", event => {
    //const inputValue = event.target.value;
    calculator.doOperation(calculator, formInput.innerHTML);
  })
});

