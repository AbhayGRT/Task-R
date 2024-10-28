function regexOutput(expression) {
    const singleCharacter = parseExpression(expression);
    console.log(`Parsing: ${singleCharacter}`)
    const result = evaluateExpression(singleCharacter);
    return result;
}

function parseExpression(expression) {
    const result = expression.match(/(\d*\.?\d+|\+|\-|\*|\/|%)/g);
    return result;
}

function evaluateExpression(singleCharacter) {
    const resultArray = processMultiplicationAndDivision(singleCharacter);
    console.log(`Multiplication: ${resultArray}`)
    return processAdditionAndSubtraction(resultArray);
}

function processMultiplicationAndDivision(singleCharacter) {
    let resultArray = [];
    for (let i = 0; i < singleCharacter.length; i++) {
        if (singleCharacter[i] === '*' || singleCharacter[i] === '/' || singleCharacter[i] === '%') {
            let next = resultArray[resultArray.length - 1];
            resultArray = resultArray.slice(0, -1);


            console.log(`Array ${resultArray}`)


            let result = operator(next, singleCharacter[i], singleCharacter[i + 1]);
            resultArray.push(result);


            // console.log(`Array ${resultArray}`)
            i++;
        } else {
            resultArray.push(singleCharacter[i]);
            console.log(`Array ${resultArray}`)
        }
    }
    return resultArray;
}

function processAdditionAndSubtraction(resultArray) {
    if (!resultArray.includes('+') && !resultArray.includes('-')) {
        return parseFloat(resultArray[0]);
    }

    let res = parseFloat(resultArray[0]);
    for (let i = 1; i < resultArray.length; i += 2) {
        let op = resultArray[i];
        let next = parseFloat(resultArray[i + 1]);
        res = operator(res, op, next);
        console.log(`Result ${res}`)
    }
    return res;
}

function operator(prev, operator, next) {
    let a = parseFloat(prev);
    let b = parseFloat(next);
    switch (operator) {
        case '*': return a * b;
        // case '/':
        // if (b === 0) {
        //     return 'Error: Cannot divide by 0';
        // }
        // return a / b;
        case '/': return a / b;
        case '%': return a % b;
        case '-': return a - b;
        case '+': return a + b;
    }
}


const display = document.querySelector('.display')
// console.log(display);
const buttons = document.querySelectorAll('.button')
// console.log(buttons);

let displayValue = '';
let isNewNumber = true

function updateDisplay() {
    display.textContent = displayValue
    // console.log(display.textContent)
}

function clearCalculator() {
    displayValue = '';
    isNewNumber = true;
    updateDisplay();
}

function calculateResult() {
    // try 
    // {
    displayValue = regexOutput(displayValue).toString();
    // isNewNumber = true;
    // updateDisplay();


    if (isNaN(displayValue)) {
        displayValue = 'Error: Give a correct expression!'
        isNewNumber = true
        updateDisplay()
        return
    }

    else if (!isFinite(displayValue)) {
        displayValue ='Cannot divide by 0';
        isNewNumber = true;
        updateDisplay();
        return;
    }

    displayValue = displayValue.toString();
    isNewNumber = true;
    updateDisplay();


    // } 
    // catch 
    // {
    //     displayValue = 'Error';
    //     isNewNumber = true;
    //     updateDisplay();
    // }
}

function handleOperator(operator) {
    if (displayValue === '' || '+-*/%'.includes(displayValue[displayValue.length - 1])) {
        displayValue = displayValue.slice(0, -1) + operator; 
    } else {
        displayValue += operator;
    }
    updateDisplay();
}


function handleDigit(digit) {
    // If the output is a new number then do this
    if (isNewNumber) {
        displayValue = digit;
        isNewNumber = false;
    }
    
    else {
        //else this
        displayValue += digit;
    }
    updateDisplay();
}

// display in webpage
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if ('0123456789.'.includes(value)) {
            handleDigit(value)
        }
        else if ('+-*/%'.includes(value)) {
            handleOperator(value)
        }
        else if (value === '=') {
            calculateResult(value)
        }
        else if (value === 'C') {
            clearCalculator();
        }
        else if (value === '00'){
            handleDigit(value)
        }
        else if (value === 'CE') {
            displayValue = displayValue.slice(0, -1)
            updateDisplay()
        }
    })
})

// keyboard
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if ('0123456789.'.includes(key)) {
        handleDigit(key);
    } else if ('+-*/'.includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape') {
        clearCalculator();
    } else if (key === 'Backspace') {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    }
});
