
      function updateResults() {
        const inputFields = document.getElementsByClassName('input-field');
        for (const inputField of inputFields) {
          const expression = inputField.value;
          const resultField = document.getElementById(`result_${inputField.id}`);
          if (resultField) {
            const result = evaluateExpression(expression);
            if (!isNaN(result)) {
              resultField.textContent = result.toFixed(2);
            } else {
              resultField.textContent = '';
            }
          }
        }
      }

      function evaluateExpression(expression) {
        try {
          console.log(expression);
            const variables = expression.match(/[a-z]/g);
            console.log(variables);
            if (variables) {
                let evaluatedExpression = expression;
                console.log(evaluatedExpression);
                for (const variable of variables) {
                    const inputField = document.getElementById(`result_${variable}`);
                    console.log(inputField);
                    if (inputField) {
                      console.log(inputField.innerHTML);
                        const variableValue = parseFloat(inputField.innerHTML);
                        evaluatedExpression = evaluatedExpression.replace(variable, variableValue);
                        console.log(evaluatedExpression);
                    }
                }
                return eval(evaluatedExpression);
            } else {
                return eval(expression);
            }
        } catch (error) {
            return NaN;
        }
      };
      let counter = 1;

      form_data = fetch("/get-form-data")
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error fetching form data:", error);
        });

        
      if (form_data.length > 0) {
          form_data.forEach((data) => {
              // Create and append input fields based on the data


              const inputField = document.createElement('input');
              inputField.type = 'text';
              inputField.className = 'input-field';
              inputField.id = String.fromCharCode(96 + counter);
              inputField.placeholder = data.name;
              inputField.name = data.name;
              inputField.value = data.value;

              const label = document.createElement('label');
              label.setAttribute('for', inputField.id);
              label.textContent = '(' + inputField.id + ')' + inputField.placeholder + ": "

              const resultField = document.createElement('span');
              resultField.className = 'result';
              resultField.id = `result_${inputField.id}`;

              const br = document.createElement('br');
              document.getElementById('dataForm').appendChild(label);
              document.getElementById('dataForm').appendChild(inputField);
              document.getElementById('dataForm').appendChild(resultField);
              document.getElementById('dataForm').appendChild(br);
              counter++;

              inputField.addEventListener('click', function() {
                const expression = inputField.value;
                console.log("eventlistenter: ", expression);
                const result = evaluateExpression(expression);
                if (!isNaN(result)) {
                    resultField.textContent = `${result.toFixed(2)}`;
                } else {
                    resultField.textContent = '';
                }
            });
        });

        
        }

      //--------------------------------------------------------------------------------------
      document.addEventListener('DOMContentLoaded', function() {
          const container = document.getElementById('dataForm');
          const addButton = document.getElementById('addInput');
          const placeholderInput = document.getElementById('placeholderInput');
          //console.log("i am listening");

          addButton.addEventListener('click', function() {
              const placeholder = placeholderInput.value;
              if (!placeholder) {
                  alert('Please enter a placeholder name.');
                  return;
              }

              const inputField = document.createElement('input');
              inputField.type = 'text';
              inputField.className = 'input-field';
              inputField.id = String.fromCharCode(96 + counter);
              inputField.placeholder = placeholder;
              inputField.name = placeholder;

              const label = document.createElement('label');
              label.setAttribute('for', inputField.id);
              label.textContent = '(' + inputField.id + ')' + inputField.placeholder + ": ";

              const resultField = document.createElement('span');
              resultField.className = 'result';
              resultField.id = `result_${String.fromCharCode(96 + counter)}`;

              container.appendChild(label);
              container.appendChild(inputField);
              container.appendChild(resultField);
              container.appendChild(document.createElement('br'))

              placeholderInput.value = ''; // Clear the input field
              counter++;

              inputField.addEventListener('input', function() {
                
                  const expression = inputField.value;
                  console.log("eventlistenter: ", expression);
                  const result = evaluateExpression(expression);
                  if (!isNaN(result)) {
                      resultField.textContent = `${result.toFixed(2)}`;
                  } else {
                      resultField.textContent = '';
                  }
              });
          });

          
      });

      //to  Add an input event listener to update results as you type
      document.addEventListener('input', updateResults);

      // Function to refresh all results
      function refreshResults() {
        updateResults();
      }

      // Attach the refreshResults function to a button click
      const refreshButton = document.getElementById('refreshButton');
      refreshButton.addEventListener('click', refreshResults);
