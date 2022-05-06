let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('delBtn')
const pointButton = document.getElementById('pointBtn')
// const lastOperationScreen = document.getElementById('lastOperationScreen')
// const currentOperationScreen = document.getElementById('currentOperationScreen')

window.addEventListener('keydown', handlekeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentOperationScreen.textContent += number
  let maxNineDigit = currentOperationScreen.textContent  //make the display maximum 9 digit
  if (maxNineDigit.length > 9) {
    currentOperationScreen.textContent = maxNineDigit.substring(0,9)
  }
}

function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
  .toString()
  .slice(0, -1)
}
//keyboard input
function handlekeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(e.key)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}


//decimal number
function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0'
  if (currentOperationScreen.textContent.includes('.')) return
  currentOperationScreen.textContent += '.'
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '/' && currentOperationScreen.textContent === '0') {
    alert('Cannot divide by zero')
    return
  }
  secondOperand = currentOperationScreen.textContent
  currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(num) {
  return Math.round(num * 100) / 100 //2 digit after decimal point
}

//func / * - +
function add(num1, num2) {
  return +num1 + +num2 //convert string to numbers
}

function subtract(num1, num2) {
  return num1 - num2
}

function multiply(num1, num2) {
  return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

//operate function
function operate(operator, num1, num2) {

  switch(operator) {
    case '+':
      return add(num1, num2)

    case '-':
      return subtract(num1, num2)

    case '*':
      return multiply(num1, num2)

    case '/':
      return divide(num1, num2)

    default:
    return null
    }
}
