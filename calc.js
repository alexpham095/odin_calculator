const ops = document.querySelectorAll(".ops");
const equals = document.querySelector("#equals");
const ac = document.querySelector("#ac");
const backspace = document.querySelector("#back");

let val = "";
let numbers = document.querySelectorAll(".nums");
let display = document.querySelector("#display");
let equ = "";

const updateDisplay= () => {
  if(val == ""){  
    display.textContent = "0";
    
  } else {
    display.textContent = val;
  }
};

const addToVal = digit => {
	val += digit;
	updateDisplay();
};

const numberPress = num => {
	if (val.length <= 13) {
		if (num.match(/[0-9]/)) {
			addToVal(num);
		} else {
			if (!val.includes(".")) {
				addToVal(num);
			}
		}
	}
};

numbers.forEach(button => {
	button.addEventListener("click", button => {
		let digit = button.srcElement.textContent;
		numberPress(digit);
	});
});

const addToEquation = () => {
  equ += val;
}

const evalEquation = () => {
  let equation = equ;
  return eval(equation);
}

const operatorPress = op => {
  if(!equ.charAt(equ.length-1).match(/[\+\-\*\/]/) || val != "") {
    val += op;
    addToEquation();
    val ="";
    updateDisplay();
  } else {
    equ = equ.slice(0, equ.length -1);
    val += op;
    addToEquation();
    val = "";
    updateDisplay();
  }
}

ops.forEach(button => {
  button.addEventListener("click", button => {
    let op = button.srcElement.textContent;
    operatorPress(op);
  });
});

const equalsPress = () => {
  if(val != "") {
    equ += val;
    val = evalEquation();
    updateDisplay();
    equ += "=";
    addToEquation();
    equ = "";
    val = "";
  }
};

equals.addEventListener("click", button => {
  equalsPress();
});


const acPress = () => {
  val = "";
  equ = "";
  updateDisplay();
};

ac.addEventListener("click", button => {
  acPress();
});

const backPress = () => {
  val = val.slice(0, val.length -1);
  updateDisplay();
};

backspace.addEventListener("click", button => {
  backPress();
});