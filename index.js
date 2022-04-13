//form elements
const inputValue = document.getElementById("inputNumber");
const formInputs = document.querySelectorAll(".button");

const setNumbersForCalculation = (calculatorRecieved, valueFromButtonRecieved) => {
  console.log("in Function");
  
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

class Calculator {
  constructor(firstValue = undefined, secondValue = undefined, operation = '') {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.operation = operation;
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
        // works  
        /*
        if (calculatorInput.operation) {
          if (calculatorInput.secondValue === undefined) {
            calculatorInput.secondValue = Number(valueFromButton);
          } else {
            const newValueSecond = calculatorInput.secondValue + valueFromButton;
            calculatorInput.secondValue = Number(newValueSecond);
          }
          inputValue.value = calculatorInput.secondValue;
        } else {
          if (calculatorInput.firstValue === undefined) {
            calculatorInput.firstValue = Number(valueFromButton);
          } else {
            const newValueFirst = calculatorInput.firstValue + valueFromButton;
            calculatorInput.firstValue = Number(newValueFirst);
          }
          inputValue.value = calculatorInput.firstValue;
        }*/
        calculatorInput = setNumbersForCalculation(calculatorInput, valueFromButton);
        console.log(calculatorInput.firstValue);
        break;
      case 'C':
        console.log("I am by start of C, firstValue = " + calculator.firstValue);
        calculatorInput.firstValue = undefined;
        calculatorInput.secondValue = undefined;
        calculatorInput.operation = '';
        inputValue.value = 0;
        console.log("I am by end of C, firstValue = " + calculator.firstValue);
        break;
      case '+':
        console.log("in operation");
        if (calculatorInput.secondValue) {
          calculatorInput.firstValue += calculatorInput.secondValue;
          calculatorInput.secondValue = undefined;
        }
        calculatorInput.operation = "+";
        break;
      /*
      console.log("I am by start of +, firstValue = " + calculator.firstValue);
      if (calculatorInput.operation) {
        calculatorInput.secondValue = Number(inputValue.value);
        inputValue.value = Number(calculatorInput.firstValue) + Number(calculatorInput.secondValue);
      } else {
        calculatorInput.operation = "+";
        calculatorInput.firstValue = Number(inputValue.value);
      }
    
      //console.log('Hi' + calculator.firstValue);
      console.log("I am by end of +, firstValue = " + calculator.firstValue);
      break;
    case '=':
      console.log("I am by start of =, firstValue = " + calculator.firstValue);
      calculatorInput.firstValue += Number(inputValue.value);
      inputValue.value = calculatorInput.firstValue;
      calculatorInput.firstValue = 0;
      calculatorInput.operation = '';
      console.log("I am by end of =, firstValue = " + calculator.firstValue);
      break;*/
      default: console.log("No");
    }
  }
}

const calculator = new Calculator();

//listeners for buttons
formInputs.forEach((formInput) => {
  formInput.addEventListener("click", event => {
    //const inputValue = event.target.value;
    //console.log(inputValue);
    calculator.doOperation(calculator, formInput.innerHTML);
  })
});

