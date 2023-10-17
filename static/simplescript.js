function appendToDisplay(value) {
    const display = document.getElementById("display");
    const currentValue = display.value;

    // Check if the last character is an operator
    const lastChar = currentValue[currentValue.length - 1];
    if ('+-*/'.includes(lastChar) && '+-*/'.includes(value)) {
        // Replace the last character with the new operator
        display.value = currentValue.slice(0, -1) + value;
    } else {
        // Otherwise, append the value to the display
        display.value += value;
    }
    while (display.scrollWidth > display.clientWidth) {
        const fontSize = parseInt(getComputedStyle(display).fontSize);
        display.style.fontSize = (fontSize - 1) + "px";
    }
}

function clearDisplay() {
    document.getElementById("display").value = "";
    display.style.fontSize = "40px"; // Reset font size
}

function deleteLastCharacter() {
    const display = document.getElementById("display");
    const currentValue = display.value;
    display.value = currentValue.slice(0, -1);
    while (display.scrollWidth < display.clientWidth) {
        const fontSize = parseInt(getComputedStyle(display).fontSize);
        display.style.fontSize = (fontSize + 1) + "px";
    }
}

function calculateResult() {
    try {
        const display = document.getElementById("display");
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1000);
    }
}

// Listen for keyboard input
document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (/[0-9+\-*/C=]/.test(key)) {
        event.preventDefault();
        if (key === "C") {
            clearDisplay();
        } else if (key === "=" || key === "Enter") {
            calculateResult();
        } else if (key === "Backspace") {
            deleteLastCharacter();
        } else {
            appendToDisplay(key);
        }
    }
});

// Add event listener for the DEL button
const delButton = document.querySelector('button:contains("DEL")');
if (delButton) {
    delButton.addEventListener("click", function() {
        deleteLastCharacter();
    });
}