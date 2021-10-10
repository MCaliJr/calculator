// Get all buttons
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operator-button");
const deleteButton = document.querySelector(".delete-button");
const allClearButton = document.querySelector(".all-clear-button");
const equalsButton = document.querySelector(".result-button");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

// Delete last character from current user input
deleteButton.addEventListener("click", function () {
  currentOperandText = currentOperandText.substring(
    0,
    currentOperandText.length - 1
  );
  currentOperandTextElement.innerText = currentOperandText;
  adjustCalcBackground(x);
});

// Delete all characters from current user input and stored variables
allClearButton.addEventListener("click", function () {
  currentOperandText = "";
  previousOperandText = "";
  currentOperandTextElement.innerText = currentOperandText;
  previousOperandTextElement.innerText = previousOperandText;
  adjustCalcBackground(x);
});

// Call calculation function and update the display
equalsButton.addEventListener("click", function () {
  if (currentOperator == "") {
    previousOperandTextElement.innerText = "";
    return;
  }
  previousOperandTextElement.innerText = `${previousOperandText} ${currentOperator} ${currentOperandText}`;
  previousOperandText = operate(
    previousOperandText,
    currentOperandText,
    currentOperator
  );
  currentOperandTextElement.innerText = previousOperandText;
  previousOperandText = previousOperandText;
  currentOperator = "";
  adjustCalcBackground(x);
});

// Function reading certain operation buttons presses
let operationButtonsArray = Array.from(operationButtons);

operationButtonsArray.forEach((button) =>
  button.addEventListener("click", function () {
    // updating display
    if (previousOperandTextElement.innerText == "") {
      previousOperandTextElement.innerText = `${currentOperandText} ${button.textContent}`;
      currentOperator = button.textContent;
      previousOperandText = currentOperandText;
      currentOperandText = "";
      currentOperandTextElement.innerText = currentOperandText;
    }
    // Calculating if operantion button is clicked more than once and updating display
    else {
      previousOperandText = operate(
        previousOperandText,
        currentOperandText,
        currentOperator
      );
      currentOperator = button.textContent;
      previousOperandTextElement.innerText = `${previousOperandText} ${button.textContent}`;
      currentOperandTextElement.innerText = "";
    }
    currentOperandText = "";
    adjustCalcBackground(x);
  })
);

// Function reading certain number buttons presses
let numberButtonsArray = Array.from(numberButtons);

numberButtonsArray.forEach((button) =>
  button.addEventListener("click", function () {
    appendNumbers(button.textContent);
    adjustCalcBackground(x);
  })
);

// Append numbers to a variable and show them on the calculator display
let currentOperandText = "";
function appendNumbers(toAppend) {
  if (currentOperandText == "" && toAppend == 0) {
    currentOperandText = "";
    currentOperandTextElement.innerText = 0;

    // Make sure user can input only one decimal
  } else if (toAppend === ".") {
    if (currentOperandText.includes(".")) {
      console.log(
        "oh You sneaky boiii - no number can contain double decimals..."
      );
    } else {
      currentOperandText += toAppend;
      currentOperandTextElement.innerText = currentOperandText;
    }
  } else {
    currentOperandText += toAppend;
    currentOperandTextElement.innerText = currentOperandText;
  }
}

// Calculator functions
const add = function (num1, num2) {
  return +num1 + +num2;
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const multiply = function (num1, num2) {
  return num1 * num2;
};

const divide = function (num1, num2) {
  // Make sure user can't divide by 0
  if (num2 == 0) {
    return "nah man...";
  } else {
    return num1 / num2;
  }
};

// Function that fires calculation based on user-chosen operator
function operate(num1, num2, operatorFunction) {
  if (operatorFunction == "+") {
    return add(num1, num2);
  } else if (operatorFunction == "-") {
    return subtract(num1, num2);
  } else if (operatorFunction == "×") {
    return multiply(num1, num2);
  } else if (operatorFunction == "÷") {
    return divide(num1, num2);
  } else {
    return num1;
  }
  num1 = num2;
}

// JS responsible for page displaying correcly while height of the page is below 700px
function adjustCalcBackground(x) {
  let offsetHeight = document.querySelector("#output").offsetHeight;
  if (x.matches) {
    // Adjust calculator background based on input field size
    document.getElementById("glass-board").style.height =
      580 + offsetHeight + "px";
    document.getElementById("glass-board").style.top = "50%";
    document.getElementById("glass-board").style.transform =
      "translate(-50%, -50%)";
  } else {
    document.getElementById("glass-board").style.height =
      580 + offsetHeight + "px";
    document.getElementById("glass-board").style.top = "0px";
    document.getElementById("glass-board").style.transform = "translate(-50%)";
  }
}

let x = window.matchMedia("(min-height: 701px)");
adjustCalcBackground(x); // Call listener function firing at run time
x.addListener(adjustCalcBackground); // Listener function firing on state changes
