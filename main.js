const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
    const value = key.dataset.key;


    key.addEventListener("click", () => {
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value == "delet") {
            input = input.slice(0, -1);
            display_input.innerHTML = cleanInput(input);
        } else if (value == "=") {
            let result = eval(perpareInput(input));
            display_output.innerHTML = cleanOutput(result);
        } else if (value == "brackets") {
            if (
				input.indexOf("(") == -1 || 
				input.indexOf("(") != -1 && 
				input.indexOf(")") != -1 && 
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 && 
				input.indexOf(")") == -1 || 
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}
			display_input.innerHTML = cleanInput(input);
        } else {
            if (validateInput(value)) {
                input += value;
                display_input.innerHTML = cleanInput(input);
            }
        }
    });
};

function cleanInput(input){
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for(let i = 0; i < input_array_length; i++){
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">×</span> `;
        }
        if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">÷</span> `;
        }
        if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        }
        if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">−</span> `;
        }
        if (input_array[i] == "(") {
            input_array[i] = ` <span class="brackets">(</span> `;
        }
        if (input_array[i] == ")") {
            input_array[i] = ` <span class="brackets">)</span> `;
        }
        if (input_array[i] == "%") {
            input_array[i] = ` <span class="percent">%</span> `;
        }
    }

    return input_array.join("");
}

// function cleanOutput(output){
//     output = Math.round(output * 100) / 100;
//     let output_string = output.toString();
//     let decimal = output_string.split(".")[1];


//     output_string = output_string.split(".")[0];

//     let output_array = output_string.split("");

//     if(output_array.length > 3){
//         for(let i = output_array.length - 3; i > 0; i-=3){
//             output_array.splice(i, 0, ",");
//         }
//     }

//     if(decimal){
//         output_array.push(".");
//         output_array.push(decimal);
//     }


//     return output_array.join("");
// }


function cleanOutput(output){
    let roundedOutput = parseFloat(output.toFixed(9)); // Round to 4 decimal places
    let output_string = roundedOutput.toString();
    let decimal = output_string.split(".")[1];

    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if(output_array.length > 3){
        for(let i = output_array.length - 3; i > 0; i-=3){
            output_array.splice(i, 0, ",");
        }
    }

    if(decimal){
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}


function validateInput(value){
    let last_input = input.slice(-1);
    let operators = ["+", "-", "/", "*"];

    if(value == "." && last_input == "."){
        return false;
    }

    if(operators.includes(value)){
        if (operators.includes(last_input)) {
            return false       
        }else{
            return true
        }
    }
    return true;
}

function perpareInput (input){
    let input_array = input.split("");

    for(let i = 0; i < input_array.length; i++){
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }
    return input_array.join("");
    // return input_array;
}

